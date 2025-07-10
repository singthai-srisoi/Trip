import type { Actions } from "./$types";
import { redirect } from "@sveltejs/kit";
import { createSession } from "$lib/server/session.server";
import prisma from "$lib/server/prisma.server";


export let actions = {
    login: async ({ cookies, request }) => {
        // const formData = await request.formData()
        // const username = formData.get("username")?.toString()
        // const password = formData.get("password")?.toString()

        // if (!username || !password) {
        //     return fail(400, { error: "Missing username or password" })
        // }

        // const user = await prisma.users.findUnique({
        //     where: { username }
        // })

        // if (!user || !user.hashed_password) {
        //     return fail(401, { error: "Invalid username or password" })
        // }

        // const encoder = new TextEncoder()
        // const raw = encoder.encode(password)
        // const hashedPassword = await crypto.subtle.digest("SHA-256", raw)

        // if (
        //     !Buffer.compare(
        //         Buffer.from(user.hashed_password),
        //         Buffer.from(hashedPassword)
        //     ) === 0
        // ) {
        //     return fail(401, { error: "Invalid credentials" })
        // }

        await prisma.session.deleteMany({
            where: {
                user_id: 1 //! Replace with the actual user ID from the login
            }
        })

        const session = await createSession(1)

        cookies.set("session", session.token, {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 // 1 day
        })

        throw redirect(302, "/trips")


    },
    might: async () => {
        return {
            form: {
                errors: {
                    email: "Invalid email address",
                    password: "Password must be at least 8 characters long"
                }
            }
        }
    }
} satisfies Actions