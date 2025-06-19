import prisma from "$lib/server/prisma.server";
import type { PageServerLoad } from "./$types";


export let load: PageServerLoad = async ({ params }) => {
    let id = Number(params.id)
    let trips = await prisma.trips.findUnique({
        where: {
            id: id
        },
        include: {
            vehicles: true,
            destinations_trips_end_destination_idTodestinations: true,
            destinations_trips_start_destination_idTodestinations: true,
            users_trips_driver_idTousers: true,
            trip_chats: true,
        }
    })
    return {
        trips
    }
}

