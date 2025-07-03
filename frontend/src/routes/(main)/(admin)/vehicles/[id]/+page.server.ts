import prisma from '$lib/server/prisma.server';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from "./$types";
import { fail } from '@sveltejs/kit';
import { vehicleSchema } from '$lib/schema/VehicleSchema';
import { success } from 'zod/v4';

export let load: PageServerLoad = async ({ params }) => {
    let vehicle = await prisma.vehicles.findUnique({
        where: {
            id: Number(params.id) ?? 0
        }
    })
    const form = await superValidate(zod(vehicleSchema));

    return {
        form,
        vehicle,
    }
}


export let actions = {
    edit: async ({ request }) => {

        const form = await superValidate(request, zod(vehicleSchema))

        if (!form.valid) {
            return fail(400, { form })
        }

        const vehicleId = form.data.id // Make sure your schema includes `id`
        if (!vehicleId) {
            return fail(400, { form, message: "Missing ID" })
        }


        await prisma.vehicles.update({
            where: { id: vehicleId },
            data: {
                ...form.data,
            },
        })

        return { success: true, message: "Vehicle updated successfully" }


    
    }
} satisfies Actions