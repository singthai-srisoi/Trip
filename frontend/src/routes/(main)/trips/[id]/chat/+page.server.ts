import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import prisma from "$lib/server/prisma.server";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { chatSchemaCreate } from "$lib/schema/ChatSchema";


export let load: PageServerLoad = async ({ parent }) => {
    let layoutData = await parent()
    let trip_id = layoutData.id
    let trip_chats = await prisma.trip_chats.findMany({
        where: { trip_id },
        orderBy: {
            timestamp: 'asc'
        }

    })

    return {
        data: layoutData,
        trip_chats
    }
}

export let actions = {
    sent: async ({ request }) => {
        const form = await superValidate(request, zod(chatSchemaCreate))

        if (!form.valid) {
            return fail(400, { form })
        }

        const tripId = form.data.trip_id // Make sure your schema includes `id`
        if (!tripId) {
            return fail(400, { form, message: "Missing trip ID" })
        }

       let res = await prisma.trip_chats.create({
            data: form.data
        })
        if (!res) {
            return fail(500, { form, message: 'Failed to create trip' })
        }
        return redirect(303, `/trips/${tripId}/chat`)
    
    }
} satisfies Actions