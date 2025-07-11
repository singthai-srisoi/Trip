import prisma from '$lib/server/prisma.server';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from "./$types";
import { fail } from '@sveltejs/kit';
import { destinationSchema } from '$lib/schema/DestinationSchema';

export let load: PageServerLoad = async ({ params }) => {
    let destination = await prisma.destinations.findUnique({
        where: {
            id: Number(params.id) ?? 0
        }
    })
    const form = await superValidate(zod(destinationSchema));

    return {
        form,
        destination,
    }
}


export let actions = {
    edit: async ({ request }) => {

        const form = await superValidate(request, zod(destinationSchema))

        if (!form.valid) {
            return fail(400, { form })
        }

        const destinationId = form.data.id // Make sure your schema includes `id`
        if (!destinationId) {
            return fail(400, { form, message: "Missing ID" })
        }


        await prisma.destinations.update({
            where: { id: destinationId },
            data: {
                ...form.data,
            },
        })

        return { success: true, message: "Destination updated successfully" }


    
    }
} satisfies Actions