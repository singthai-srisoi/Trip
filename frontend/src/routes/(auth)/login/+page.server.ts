import type { Actions } from "./$types";
import { redirect } from "@sveltejs/kit";
import { createSession } from "$lib/server/session.server";
import prisma from "$lib/server/prisma.server";


export let actions = {
    login: async ({ cookies, request }) => {
        let formData = await request.formData();
        let username = formData.get("username")?.toString();
        let password = formData.get("password")?.toString();

        if (!username || !password) {
            return {
                form: {
                    errors: {
                        username: "Invalid username",
                        password: "Invalid password"
                    }
                }
            }
        }

        // get user by username
        let user = await prisma.users.findUnique({
            where: { username }
        });
        // // ! bypassing password check for now
        if (!user || !user.hashed_password) {
            return {
                form: {
                    errors: {
                        username: "Invalid username",
                        password: "Invalid password"
                    }
                }
            }
        }

        const encoder = new TextEncoder();
        const raw = encoder.encode(password);
        const hashedPassword = await crypto.subtle.digest("SHA-256", raw);
        const isMatch = Buffer.compare(
            Buffer.from(user.hashed_password, 'base64'),
            Buffer.from(hashedPassword)
        ) === 0
        // console.log(isMatch, Buffer.from(user.hashed_password).toString(), '/n', Buffer.from(hashedPassword).toString())
        // // ! bypassing password check for now
        if (!isMatch) {
            return {
                form: {
                    errors: {
                        username: "Invalid username",
                        password: "Invalid password not match"
                    }
                }
            }
        }

        await prisma.session.deleteMany({
            where: {
                user_id: user?.id
            }
        })

        const session = await createSession(user?.id ?? 1);

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
                    username: "Invalid username address",
                    password: "Password must be at least 8 characters long"
                }
            }
        }
    }
} satisfies Actions