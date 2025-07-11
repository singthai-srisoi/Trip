import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/prisma.server';
import type { destinations, trips, vehicles } from '$generated/prisma';

interface trips_model extends trips {
    vehicles: vehicles
    destinations_trips_end_destination_idTodestinations: destinations
    destinations_trips_start_destination_idTodestinations: destinations
}

export const load: PageServerLoad = async ({}) => {

    let grouped = await getTrips(null, null)
    
    return {
        trips: grouped
    }
}


export let actions = {
    search: async ({ request }) => {
        const form = await request.formData()
        console.log(Object.fromEntries(form.entries()))
        const dateStr = form.get('date') as string
        const search = form.get('search') as string | null

        let date: Date | null = null
        if (dateStr) {
            date = new Date(dateStr)
            if (isNaN(date.getTime())) {
                date = null // Invalid date
            }
        }

        let grouped = await getTrips(date, search)
        console.log({search, date}, grouped)
        if (grouped.size === 0) {
            return {
                status: 404,
                body: { message: 'No trips found for the given date or search term.' }
            }
        }


        return {
            trips: grouped
        }

    }

} satisfies Actions

let getTrips = async (date: Date | null = new Date(), search: string | null = null) => {
    // let today = new Date()
    date?.setHours(0, 0, 0, 0) // Ensure only date is matched

    const trips_ = await prisma.trips.findMany({
        where: {
            ...(date && {'date': date}),
            ...(search && {
                OR: [
                    {users_trips_driver_idTousers: {
                        name: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    }},
                    {vehicles: {
                        plate_no: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    }},
                    {destinations_trips_end_destination_idTodestinations: {
                        name: {
                            contains: search,
                            mode: 'insensitive'
                        },
                        address: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    }},
                    {destinations_trips_start_destination_idTodestinations: {
                        name: {
                            contains: search,
                            mode: 'insensitive'
                        },
                        address: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    }}
                ]
            })
        },
        include: {
            vehicles: true,
            destinations_trips_end_destination_idTodestinations: {},
            destinations_trips_start_destination_idTodestinations: {},
        },
        orderBy: {
            trip_number: 'asc' // or 'date', depending on what you want
        }
    })
    
    let grouped = new Map<string, trips_model[]>();
    for (const trip of trips_) {
        //  @ts-ignore
        const plate_no = trip.vehicles.plate_no;
        if (!grouped.has(plate_no)) {
            grouped.set(plate_no, []);
        }
        // @ts-ignore
        grouped.get(plate_no)!.push(trip);
    }

    return grouped
}