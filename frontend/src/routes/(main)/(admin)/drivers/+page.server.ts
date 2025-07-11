import prisma from "$lib/server/prisma.server";
import type { Actions, PageServerLoad } from "./$types";


export let load: PageServerLoad = async ({ url }) => {
    /**
    {
        page: '1',
        sort: 'name',
        order: 'asc',
        search: 'test',
        limit: '10'
        max_page: '10',
        data: drivers
    }
     */
    // let drivers = await prisma.users.findMany({
    //     where: {
    //         role: 'driver'
    //     }
    // })
    // const form = await superValidate(zod(tripSchemaCreate));
    // return {
    //     form,
    //     drivers,
    // }

    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const sort = url.searchParams.get('sort') || 'name'
    const order = url.searchParams.get('order') === 'desc' ? 'desc' : 'asc'
    const search = url.searchParams.get('search')?.trim() || ''

    const skip = (page - 1) * limit

    // Fetch drivers
    const drivers = await prisma.users.findMany({
        where: {
            role: 'driver',
            ...(search && {
                    name: {
                        contains: search,
                        mode: 'insensitive'
                    },
                    phone: {
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
                    name: {
                        contains: search,
                        mode: 'insensitive'
                    },
                    phone: {
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
        let userId = form.get("id");
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
            return {
                status: 500,
                body: { message: "Failed to delete user" }
            };
        }
    }

} satisfies Actions