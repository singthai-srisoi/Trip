import prisma from "$lib/server/prisma.server";
import { superValidate } from "sveltekit-superforms";
import type { PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { tripSchemaCreate } from "$lib/schema/TripSchema";


export let load: PageServerLoad = async () => {
    let drivers = await prisma.users.findMany({
        where: {
            role: 'driver'
        }
    })
    const form = await superValidate(zod(tripSchemaCreate));
    return {
        form,
        drivers,
    }
}