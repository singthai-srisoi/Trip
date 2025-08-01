// src/hooks.server.ts
import { redirect, type Handle } from "@sveltejs/kit"
import { validateSessionToken } from "$lib/server/session.server"

export const protectedRoutes = [
    '/trips',
    '/profile',
    '/settings',
    '/api'
]

export function isProtectedRoute(pathname: string) {
    return protectedRoutes.some(route => pathname.startsWith(route))
}

export const handle: Handle = async ({ event, resolve }) => {
    const pathname = new URL(event.request.url).pathname
    // console.log(event.route)

    // Redirect root to /login
    if (pathname === "/") {
        throw redirect(302, "/login")
    }

    // Get session token
    const sessionToken = event.cookies.get("session")
    let session = null

    if (sessionToken) {
        session = await validateSessionToken(sessionToken)
        if (session) {
            event.locals.session = session
        }
    }

    // If route is protected and user has no session → redirect to login
    if (event.route.id?.includes('(main)') && !session) {
        throw redirect(302, "/login")
    }

    return resolve(event)
}
