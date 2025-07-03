import prisma from "$lib/server/prisma.server";
import type { Actions, PageServerLoad } from "./$types";

export let load: PageServerLoad = async () => {
    let vehicles = await prisma.vehicles.findMany()
    return {
        vehicles,
    }
}

export let actions = {
    delete: async ({ request }) => {
        let form = await request.formData();
        let vehicleId = form.get("id");
        console.log("Delete vehicle ID:", vehicleId);
        if (!vehicleId) {
            return {
                status: 400,
                body: { message: "Missing vehicle ID" }
            };
        }
        try {
            await prisma.vehicles.delete({
                where: { id: Number(vehicleId) }
            });
            return {
                status: 303,
                headers: {
                    location: '/vehicles'
                }
            };
        } catch (error) {
            console.error("Delete vehicle error:", error);
            return {
                status: 500,
                body: { message: "Failed to delete vehicle" }
            };
        }
    }

} satisfies Actions