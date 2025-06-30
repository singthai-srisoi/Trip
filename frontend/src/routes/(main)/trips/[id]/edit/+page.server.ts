import prisma from '$lib/server/prisma.server';
import { superValidate } from 'sveltekit-superforms';
import { schemasafe, zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from "./$types";
import { tripSchema } from '$lib/schema/TripSchema';
import { fail, redirect } from '@sveltejs/kit';
import type { trips } from '$generated/prisma';

export let load: PageServerLoad = async ({ parent }) => {
    let vehicles = await prisma.vehicles.findMany()
    let destinations = await prisma.destinations.findMany()
    let drivers = await prisma.users.findMany({
        where: {
            role: 'driver'
        }
    })
    const form = await superValidate(zod(tripSchema));
    let layoutData = await parent()

    return {
        form,
        drivers,
        vehicles,
        destinations,
        data: layoutData
    }
}


export let actions = {
    edit: async ({ request }) => {
        // const form = await superValidate(request, zod(tripSchema))
        // if (!form.valid) {
        //     return fail(400, { form })
        // }
        // form.data.created_by = 1
        // let res = await prisma.trips.create({
        //     data: form.data
        // })
        // if (!res) {
        //     return fail(500, { form, message: 'Failed to create trip' })
        // }
        // return redirect(303, `/trips/${res.id}`)

        const form = await superValidate(request, zod(tripSchema))

        if (!form.valid) {
            return fail(400, { form })
        }

        const tripId = form.data.id // Make sure your schema includes `id`
        if (!tripId) {
            return fail(400, { form, message: "Missing trip ID" })
        }

        try {
            const res = await prisma.trips.update({
                where: { id: tripId },
                data: {
                    ...form.data,
                },
            })

            // return redirect(303, `/trips/${res.id}/edit`)
        } catch (error) {
            console.error("Edit trip error:", error)
            return fail(500, {
                form,
                message: "Failed to update trip",
            })
        }
    
    }
} satisfies Actions