import prisma from "$lib/server/prisma.server";
import type { Actions, PageServerLoad } from "./$types";

export let load: PageServerLoad = async ({ url }) => {
    // let vehicles = await prisma.vehicles.findMany()
    // return {
    //     vehicles,
    // }
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const sort = url.searchParams.get('sort') || 'plate_no'
    const order = url.searchParams.get('order') === 'desc' ? 'desc' : 'asc'
    const search = url.searchParams.get('search')?.trim() || ''

    const skip = (page - 1) * limit

    // Fetch drivers
    const drivers = await prisma.vehicles.findMany({
        where: {
            ...(search && {
                    plate_no: {
                        contains: search,
                        mode: 'insensitive'
                    },
                    model: {
                        contains: search,
                        mode: 'insensitive'
                    }
                }
            )
        },
        orderBy: {
            [sort]: order
        },
        skip,
        take: limit
    })

    // Count for pagination
    const totalCount = await prisma.users.count({ 
        where: {
            role: 'driver',
            ...(search && {
                    plate_no: {
                        contains: search,
                        mode: 'insensitive'
                    },
                    model: {
                        contains: search,
                        mode: 'insensitive'
                    }
                }
            )
        },
    })
    const max_page = Math.ceil(totalCount / limit)

    return {
        page: String(page),
        sort,
        order,
        search,
        limit: String(limit),
        max_page: String(max_page),
        data: drivers,
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