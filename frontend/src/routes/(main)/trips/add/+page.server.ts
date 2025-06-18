import prisma from '$lib/server/prisma.server';
import { superValidate } from 'sveltekit-superforms';
import { schemasafe } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from "./$types";
import { schema as TripSchema } from '$lib/schema/TripSchema';
import { fail } from '@sveltejs/kit';

export let load: PageServerLoad = async () => {
    let vehicles = await prisma.vehicles.findMany()
    let destinations = await prisma.destinations.findMany()
    let drivers = await prisma.users.findMany({
        where: {
            role: 'driver'
        }
    })
    return {
        drivers,
        vehicles,
        destinations
    }
}


export let actions = {
    create: async ({ request }) => {
        // let form = await request.formData()
        const adapter = schemasafe(TripSchema);
        const form = await superValidate(request, adapter)

        if (!form.valid) {
            // Return { form } and things will just work.
            return fail(400, { form });
        }

        console.log('create')
        return { success: true }
    
    }
} satisfies Actions