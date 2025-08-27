import prisma from '$lib/server/prisma.server';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from "./$types";
import { fail } from '@sveltejs/kit';
import { userSchema } from '$lib/schema/UserSchema';

export let load: PageServerLoad = async ({ params, url }) => {
    let success = url.searchParams.get("success") === "true";
    let driver = await prisma.users.findUnique({
        where: {
            id: Number(params.id) ?? 0
        }
    })
    const form = await superValidate(zod(userSchema));

    return {
        form: {
            success,
            message: success ? 'Driver added successfully' : 'Failed to add driver'
        },
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

         if (form.data.email == 'null') {
            form.data.email = undefined
        }


        const res = await prisma.users.update({
            where: { id: userId },
            data: {
                ...form.data,
            },
        })

        return { success: true, message: "Driver updated successfully" }

    
    }
} satisfies Actions