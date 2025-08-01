// session.server.ts

import prisma from "./prisma.server";

export const sessionExpiresInSeconds = 60 * 60 * 24; // 1 day

export function generateSecureRandomString(): string {
	// Human readable alphabet (a-z, 0-9 without l, o, 0, 1 to avoid confusion)
	const alphabet = "abcdefghijklmnpqrstuvwxyz23456789";

	// Generate 24 bytes = 192 bits of entropy.
	// We're only going to use 5 bits per byte so the total entropy will be 192 * 5 / 8 = 120 bits
	const bytes = new Uint8Array(24);
	crypto.getRandomValues(bytes);

	let id = "";
	for (let i = 0; i < bytes.length; i++) {
		// >> 3 s"removes" the right-most 3 bits of the byte
		id += alphabet[bytes[i] >> 3];
	}
	return id;
}

export async function createSession(user_id: number): Promise<SessionWithToken> {
	const now = new Date();

	const id = generateSecureRandomString();
	const secret = generateSecureRandomString();
	const secret_hash = await hashSecret(secret);

	const token = id + "." + secret;

	const session: SessionWithToken = {
		id,
        user_id,
		secret_hash,
		created_at: now,
		token
	};

    await prisma.session.create({
        data: {
            id: session.id,
            user_id,
            secret_hash: session.secret_hash,
            created_at: Math.floor(session.created_at.getTime() / 1000)
        }
    });

	return session;
}

export async function hashSecret(secret: string): Promise<Uint8Array> {
	const secretBytes = new TextEncoder().encode(secret);
	const secretHashBuffer = await crypto.subtle.digest("SHA-256", secretBytes);
	return new Uint8Array(secretHashBuffer);
}

export interface SessionWithToken extends Session {
	token: string
}

export interface Session {
    id: string
    user_id: number
    secret_hash: Uint8Array
    created_at: Date
}


export async function validateSessionToken(token: string): Promise<Session | null> {
	const tokenParts = token.split(".");
	if (tokenParts.length != 2) {
		return null;
	}
	const sessionId = tokenParts[0];
	const sessionSecret = tokenParts[1];

	// const session = await getSession(dbPool, sessionId);
    const session = await getSession(sessionId);
    if (!session) {
        return null;
    }

	const tokenSecretHash = await hashSecret(sessionSecret);
	const validSecret = constantTimeEqual(tokenSecretHash, session.secret_hash);
	if (!validSecret) {
		return null;
	}

	return session;
}

export async function getSession(sessionId: string): Promise<Session | null> {
	const now = new Date();

    const result = await prisma.session.findUnique({
        where: {
            id: sessionId
        },
    })
    if (!result) {
        return null;
    }
	const session: Session = {
        id: result.id,
        user_id: result.user_id,
        secret_hash: new Uint8Array(result.secret_hash),
        created_at: new Date(result.created_at * 1000)
    }

	// Check expiration
	if (now.getTime() - session.created_at.getTime() >= sessionExpiresInSeconds * 1000) {
		await deleteSession(sessionId);
		return null;
	}

	return session;
}

export async function deleteSession(sessionId: string): Promise<void> {
	// await executeQuery(dbPool, "DELETE FROM session WHERE id = ?", [sessionId]);
    await prisma.session.delete({
        where: {
            id: sessionId
        }
    });
}


export function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
	if (a.byteLength !== b.byteLength) {
		return false;
	}
	let c = 0;
	for (let i = 0; i < a.byteLength; i++) {
		c |= a[i] ^ b[i];
	}
	return c === 0;
}

export function encodeSessionPublicJSON(session: Session): string {
	// Omit Session.secretHash
	const json = JSON.stringify({
		id: session.id,
		created_at: Math.floor(session.created_at.getTime() / 1000)
	});
	return json;
}
