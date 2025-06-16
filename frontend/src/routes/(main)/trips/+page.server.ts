import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma.server';
import { DATABASE_URL } from '$env/static/private';

export const load: PageServerLoad = async ({ url }) => {
    console.log('DATABASE_URL:', DATABASE_URL)
    const trips = await prisma.trips.findMany({})
    console.table(trips)
    return {
        trips
    }
}