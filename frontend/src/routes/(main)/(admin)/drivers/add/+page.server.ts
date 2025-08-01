import prisma from '$lib/server/prisma.server';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from "./$types";
import { fail, redirect } from '@sveltejs/kit';
import { userSchemaCreate } from '$lib/schema/UserSchema';
import { DEFAULT_PASSWORD } from '$env/static/private';




export let actions = {
    create: async ({ request }) => {
        const form = await superValidate(request, zod(userSchemaCreate))
        if (!form.valid) {
            return fail(400, { form })
        }
        
        const encoder = new TextEncoder();
        const raw = encoder.encode(DEFAULT_PASSWORD);
        const hashedPassword = await crypto.subtle.digest("SHA-256", raw);

        form.data.hashed_password = Buffer.from(hashedPassword).toString('base64')
        
        let res = await prisma.users.create({
            data: {...form.data}
        })
        if (!res) {
            return fail(500, { form, message: 'Failed to create trip' })
        }
        return redirect(303, `/drivers/${res.id}`)
    
    }
} satisfies Actions