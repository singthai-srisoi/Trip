import prisma from "$lib/server/prisma.server";
import { success } from "zod/v4";
import type { Actions, PageServerLoad } from "./$types";

export let load: PageServerLoad = async () => {
    let destinations = await prisma.destinations.findMany()
    return {
        destinations,
    }
}

export let actions = {
    delete: async ({ request }) => {
        let form = await request.formData();
        let destinationId = form.get("id");
        console.log("Delete destination ID:", destinationId);
        if (!destinationId) {
            return {
                status: 400,
                body: { message: "Missing destination ID" }
            };
        }
        try {
            await prisma.destinations.delete({
                where: { id: Number(destinationId) }
            });
            return { success: true, message: "Destination deleted successfully" };
        } catch (error) {
            console.error("Delete destination error:", error);
            return {
                success: false,
                message: "Failed to delete destination" + error,
            };
        }
    }

} satisfies Actions