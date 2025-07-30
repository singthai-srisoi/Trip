import prisma from "$lib/server/prisma.server";
import { message } from "sveltekit-superforms";
import type { Actions, PageServerLoad } from "./$types";

export let load: PageServerLoad = async ({ locals }) => {
    let user_id = locals.session?.user_id;
    let user = await prisma.users.findUnique({
        where: { id: user_id },
    })

    return {
        user,
    }
    

}

export let actions: Actions = {
    reset_password: async ({ request, locals }) => {
        console.log('reset_password', locals)

        let user_id = locals.session?.user_id
        if (!user_id) {
            return {
                form: {
                    errors: {
                        user_id: "User ID is required"
                    }
                }
            }
        }

        let formData = await request.formData();
        let new_password = formData.get("new_password")?.toString();

        if (!new_password) {
            return {
                form: {
                    errors: {
                        new_password: "New password is required"
                    }
                }
            }
        }

        let old_password = formData.get("old_password")?.toString();
        if (!old_password) {
            return {
                form: {
                    errors: {
                        old_password: "Old password is required"
                    }
                }
            }
        }

        let user = await prisma.users.findUnique({
            where: { id: user_id }
        })

        if (user?.hashed_password) {
            let encoder1 = new TextEncoder();
            const raw1 = encoder1.encode(old_password);
            const hashedOldPassword = await crypto.subtle.digest("SHA-256", raw1);
            const isMatch = Buffer.compare(
                Buffer.from(user.hashed_password, 'base64'),
                Buffer.from(hashedOldPassword)
            ) === 0
            if (!isMatch) {
                return {
                    form: {
                        errors: {
                            old_password: "Old password is incorrect"
                        }
                    }
                }
            }

        }
        
        


        const encoder = new TextEncoder();
        const raw = encoder.encode(new_password);
        const hashedPassword = await crypto.subtle.digest("SHA-256", raw);

        await prisma.users.update({
            where: { id: user_id },
            data: {
                hashed_password: Buffer.from(hashedPassword).toString('base64')
            }
        })

        return {
            success: true,
            message: "Password reset successfully"
        }


    }
}