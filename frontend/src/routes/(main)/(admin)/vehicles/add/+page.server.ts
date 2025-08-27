import prisma from '$lib/server/prisma.server';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from "./$types";
import { fail, redirect } from '@sveltejs/kit';
import { vehicleSchema, vehicleSchemaCreate } from '$lib/schema/VehicleSchema';




export let actions = {
    create: async ({ request }) => {
        const form = await superValidate(request, zod(vehicleSchemaCreate))
        if (!form.valid) {
            return fail(400, { form })
        }
        let res = await prisma.vehicles.create({
            data: form.data
        })
        if (!res) {
            return fail(500, { form, message: 'Failed to create trip' })
        }
        return redirect(303, `/vehicles/${res.id}?success=true`)
    
    }
} satisfies Actions