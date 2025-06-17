import prisma from '$lib/server/prisma.server';
import type { PageServerLoad } from "./$types";

export let load: PageServerLoad = async () => {
    let vehicles = await prisma.vehicles.findMany()
    let destinations = await prisma.destinations.findMany()
    return {
        vehicles,
        destinations
    }
}