import prisma from '$lib/server/prisma.server';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from "./$types";
import { fail } from '@sveltejs/kit';
import { userSchema } from '$lib/schema/UserSchema';

export let load: PageServerLoad = async ({ params }) => {
    let driver = await prisma.users.findUnique({
        where: {
            id: Number(params.id) ?? 0
        }
    })
    const form = await superValidate(zod(userSchema));

    return {
        form,
        driver,
    }
}


export let actions = {
    edit: async ({ request }) => {

        const form = await superValidate(request, zod(userSchema))

        if (!form.valid) {
            return fail(400, { form })
        }

        const userId = form.data.id // Make sure your schema includes `id`
        if (!userId) {
            return fail(400, { form, message: "Missing trip ID" })
        }

        try {
            const res = await prisma.users.update({
                where: { id: userId },
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
    
    }
} satisfies Actions