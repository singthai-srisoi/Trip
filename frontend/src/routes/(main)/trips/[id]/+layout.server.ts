import prisma from "$lib/server/prisma.server";
import { includes } from "zod/v4";
import type { LayoutServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

const ROLE_ALLOWED = ['admin', 'driver', 'director'];
export let load: LayoutServerLoad = async ({ params, parent }) => {
    let { user } = await parent()
    if (!user || !ROLE_ALLOWED.includes(user.role)) {
        throw error(403, 'Forbidden')
    }
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
            trip_chats: {
                include: {
                    users: true
                },
            }
        }
    })
    return {
        id,
        trips,
        user
    }
}

