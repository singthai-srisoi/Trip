import prisma from '$lib/server/prisma.server';
import { superValidate } from 'sveltekit-superforms';
import { schemasafe, zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from "./$types";
import { tripSchemaCreate } from '$lib/schema/TripSchema';
import { fail, redirect } from '@sveltejs/kit';
import type { trips } from '$generated/prisma';

export let load: PageServerLoad = async () => {
    let vehicles = await prisma.vehicles.findMany()
    let destinations = await prisma.destinations.findMany()
    let drivers = await prisma.users.findMany({
        where: {
            role: 'driver'
        }
    })
    const form = await superValidate(zod(tripSchemaCreate));
    return {
        form,
        drivers,
        vehicles,
        destinations
    }
}


export let actions = {
    create: async ({ request }) => {
        const form = await superValidate(request, zod(tripSchemaCreate))
        if (!form.valid) {
            return fail(400, { form })
        }
        form.data.created_by = 1
        let res = await prisma.trips.create({
            data: form.data
        })
        if (!res) {
            return fail(500, { form, message: 'Failed to create trip' })
        }
        return redirect(303, `/trips/${res.id}`)
    
    }
} satisfies Actions