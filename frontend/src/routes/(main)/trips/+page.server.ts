import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma.server';
import type { destinations, trips, vehicles } from '$generated/prisma';

interface trips_model extends trips {
    vehicles: vehicles
    destinations_trips_end_destination_idTodestinations: destinations
    destinations_trips_start_destination_idTodestinations: destinations
}

export const load: PageServerLoad = async ({}) => {
    let today = new Date()
    today.setHours(0, 0, 0, 0) // Ensure only date is matched

    const trips_ = await prisma.trips.findMany({
        // where: {
        //     date: today
        // },
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
    

    const vehicles = (await prisma.vehicles.findMany({
        select: {
            plate_no: true,
        },
        where: {
            trips: {
                some: {}
            }
        }
    })).map(v => v.plate_no)
    
    return {
        vehicles,
        trips: grouped
    }
}