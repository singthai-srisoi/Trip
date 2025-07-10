// src/lib/server/lucia.server.ts
import { Lucia } from "lucia";
import { dev } from "$app/environment";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from '$generated/prisma';
import { DATABASE_URL } from "$env/static/private";



const client = new PrismaClient({
    datasourceUrl: DATABASE_URL
});

const adapter = new PrismaAdapter(client.session, client.users);

export const lucia = new Lucia(adapter, {
 sessionCookie: {
  attributes: {
   // set to `true` when using HTTPS
   secure: !dev
  }
 },
    getUserAttributes: (attributes)=>{
        return {
            email: attributes.email
        }
    },
    
    
});

declare module "lucia" {
    interface Register {
    Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes
        DatabaseSessionAttributes: DatabaseSessionAttributes
    }
}

interface DatabaseUserAttributes {
    email: string
}

interface DatabaseSessionAttributes {
    id: string
    user_id: string
    expires_at: Date
}