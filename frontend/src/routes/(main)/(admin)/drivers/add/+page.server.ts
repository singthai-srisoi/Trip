import prisma from '$lib/server/prisma.server';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from "./$types";
import { fail, redirect } from '@sveltejs/kit';
import { userSchemaCreate } from '$lib/schema/UserSchema';




export let actions = {
    create: async ({ request }) => {
        console.log('Creating a new driver');
        const form = await superValidate(request, zod(userSchemaCreate))
        console.log('Form data:', form.data);
        if (!form.valid) {
            return fail(400, { form })
        }
        
        let res = await prisma.users.create({
            data: form.data
        })
        if (!res) {
            return fail(500, { form, message: 'Failed to create trip' })
        }
        return redirect(303, `/drivers/${res.id}`)
    
    }
} satisfies Actions