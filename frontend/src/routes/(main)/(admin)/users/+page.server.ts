import prisma from "$lib/server/prisma.server";
import { superValidate } from "sveltekit-superforms";
import type { Actions, PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { tripSchemaCreate } from "$lib/schema/TripSchema";
import { request } from "http";


export let load: PageServerLoad = async () => {
    let users = await prisma.users.findMany()
    return {
        users,
    }
}

export let actions = {
    delete: async ({ request }) => {
        let form = await request.formData();
        let userId = form.get("id");
        console.log("Delete user ID:", userId);
        if (!userId) {
            return {
                status: 400,
                body: { message: "Missing user ID" }
            };
        }
        try {
            await prisma.users.delete({
                where: { id: Number(userId) }
            });
            return {
                status: 303,
                headers: {
                    location: '/users'
                }
            };
        } catch (error) {
            console.error("Delete user error:", error);
            return {
                status: 500,
                body: { message: "Failed to delete user" }
            };
        }
    }

} satisfies Actions