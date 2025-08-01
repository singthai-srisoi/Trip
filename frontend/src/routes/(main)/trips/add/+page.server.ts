import prisma from '$lib/server/prisma.server';
import { superValidate } from 'sveltekit-superforms';
import { schemasafe, zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from "./$types";
import { tripSchemaCreate } from '$lib/schema/TripSchema';
import { error, fail, redirect } from '@sveltejs/kit';
import type { trips } from '$generated/prisma';

const ROLE_ALLOWED = ['admin',];
export let load: PageServerLoad = async ({ parent }) => {
    let { user } = await parent()
    if (!user || !ROLE_ALLOWED.includes(user.role)) {
        throw error(403, 'Forbidden')
    }
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
        destinations,
        user
    }
}


export let actions = {
    create: async ({ request, locals }) => {
        let user_id: number | null | undefined = locals.session?.user_id
        let user = await prisma.users.findUnique({
            where: { id: user_id },
        })
        if (!user || !ROLE_ALLOWED.includes(user.role)) {
            throw error(403, 'Forbidden')
        }
        const form = await superValidate(request, zod(tripSchemaCreate))
        if (!form.valid) {
            return fail(400, { form })
        }
        // TODO: Set created_by to the current user ID
        form.data.created_by = locals.session?.user_id
        let res = await prisma.trips.create({
            data: form.data
        })
        // check is_gantung
        if (form.data.is_gantung) {
            // add trip 1 to next day
            form.data.date = new Date(form.data.date)
            form.data.date.setDate(form.data.date.getDate() + 1)
            form.data.is_gantung = false // Reset is_gantung for the next trip
            form.data.trip_number = 1
            await prisma.trips.create({
                data: form.data
            })
        }
        if (!res) {
            return fail(500, { form, message: 'Failed to create trip' })
        }
        return redirect(303, `/trips/${res.id}/edit`)
    
    }
} satisfies Actions