import prisma from '$lib/server/prisma.server';
import { superValidate } from 'sveltekit-superforms';
import { schemasafe, zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from "./$types";
import { tripSchema } from '$lib/schema/TripSchema';
import { error, fail, redirect } from '@sveltejs/kit';
import type { trips } from '$generated/prisma';

const ROLE_ALLOWED = ['admin', 'driver', 'director'];
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
    const form = await superValidate(zod(tripSchema));
    let layoutData = await parent()

    return {
        user,
        form,
        drivers,
        vehicles,
        destinations,
        data: layoutData
    }
}


export let actions = {
    edit: async ({ request }) => {
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
            return fail(500, {
                form,
                message: "Failed to update trip",
            })
        }
    
    },
    admin_check: async ({ params }) => {
        let id = Number(params.id)
        let trip = await prisma.trips.findUnique({
            where: { id },
        })
        if (!trip) {
            return fail(404, { message: "Trip not found" });
        }
        trip.is_double_checked = true;
        await prisma.trips.update({
            where: { id },
            data: trip
        })
    },
    driver_check: async ({ params }) => {
        let id = Number(params.id)
        let trip = await prisma.trips.findUnique({
            where: { id },
        })
        if (!trip) {
            return fail(404, { message: "Trip not found" });
        }
        trip.is_checked = true;
        await prisma.trips.update({
            where: { id },
            data: trip
        })

    },
} satisfies Actions