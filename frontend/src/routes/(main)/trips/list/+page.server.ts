import type { Prisma, trips } from "$generated/prisma";
import prisma from "$lib/server/prisma.server";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";


type TripWithVehicle = Prisma.tripsGetPayload<{
    include: {
        vehicles: { select: { plate_no: true } },
        destinations_trips_end_destination_idTodestinations: {
            select: { name: true }
        },
        destinations_trips_start_destination_idTodestinations: {
            select: { name: true }
        },
    }
}>;

interface TripsGroup {
    date: Date
    plate_no: string
    trips: TripWithVehicle[]
}

const ROLE_ALLOWED = ['admin', 'driver', 'director'];
export let load: PageServerLoad = async ({ url, parent }) => {
    let { user } = await parent()
    if (!user || !ROLE_ALLOWED.includes(user.role)) {
        throw error(403, 'Forbidden')
    }

    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const sort = url.searchParams.get('sort') || 'date'
    const order = url.searchParams.get('order') === 'desc' ? 'desc' : 'asc'
    const search = url.searchParams.get('search')?.trim() || ''
    const dateStr = url.searchParams.get('date') || ''
    let date: Date | null = null
    if (dateStr) {
        date = new Date(dateStr)
        if (isNaN(date.getTime())) {
            date = null // Invalid date
        }
    }
    

    const skip = (page - 1) * limit
    let user_id: number | null = user?.role === 'driver' ? user.id : null;

    // Fetch drivers
    const trips = await prisma.trips.findMany({
        where: {
            ...(date && {'date': date}),
            ...(user_id && {'driver_id': user_id}),
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
            vehicles: { select: { plate_no: true } },
            destinations_trips_end_destination_idTodestinations: {
                select: { name: true }
            },
            destinations_trips_start_destination_idTodestinations: {
                select: { name: true }
            },
        },
        orderBy: {
            [sort]: order
        },
        skip,
        take: limit
    })

    // Count for pagination
    const totalCount = await prisma.trips.count({ 
        where: {
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
    })
    const max_page = Math.ceil(totalCount / limit)
    let group = new Map<string, TripsGroup>()
    // @ts-ignore
    trips.forEach((trip: TripWithVehicle) => {
        let identity = `${trip.date}-${trip.vehicle_id}`;
        if (!group.has(identity)) {
            group.set(identity, {
                date: trip.date,
                plate_no: trip.vehicles?.plate_no || '',
                trips: []
            });
        }
        group.get(identity)?.trips.push(trip);
        
    })

    return {
        page: String(page),
        sort,
        order,
        search,
        limit: String(limit),
        max_page: String(max_page),
        data: Array.from(group.values()),
    }
}