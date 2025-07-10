import prisma from "$lib/server/prisma.server";
import { success } from "zod/v4";
import type { Actions, PageServerLoad } from "./$types";

export let load: PageServerLoad = async ({ url }) => {
    // let destinations = await prisma.destinations.findMany()
    // return {
    //     destinations,
    // }

    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const sort = url.searchParams.get('sort') || 'name'
    const order = url.searchParams.get('order') === 'desc' ? 'desc' : 'asc'
    const search = url.searchParams.get('search')?.trim() || ''

    const skip = (page - 1) * limit

    // Fetch drivers
    const drivers = await prisma.destinations.findMany({
        where: {
            ...(search && {
                    name: {
                        contains: search,
                        mode: 'insensitive'
                    },
                    address: {
                        contains: search,
                        mode: 'insensitive'
                    },
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
            ...(search && {
                    name: {
                        contains: search,
                        mode: 'insensitive'
                    },
                    address: {
                        contains: search,
                        mode: 'insensitive'
                    },
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