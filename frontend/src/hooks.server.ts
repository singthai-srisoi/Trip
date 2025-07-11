// src/hooks.server.ts
import type { Handle } from "@sveltejs/kit"
import { validateSessionToken } from "$lib/server/session.server"

export const handle: Handle = async ({ event, resolve }) => {
    const sessionToken = event.cookies.get("session")
    if (sessionToken) {
        const session = await validateSessionToken(sessionToken)
        if (session) {
            event.locals.session = session
        }
    }

    return resolve(event)
}
