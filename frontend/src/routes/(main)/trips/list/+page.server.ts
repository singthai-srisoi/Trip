import type { Prisma, trips } from "$generated/prisma";
import prisma from "$lib/server/prisma.server";
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


export let load: PageServerLoad = async () => {
    let trips = await prisma.trips.findMany({
        include: {
            vehicles: { select: { plate_no: true } },
            destinations_trips_end_destination_idTodestinations: {
                select: { name: true }
            },
            destinations_trips_start_destination_idTodestinations: {
                select: { name: true }
            },
        },
        orderBy: [{ date: 'asc' }, { vehicle_id: 'asc' }]
    })

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

    console.log('trips', trips)
    return {
        trips: Array.from(group.values())
    }
}