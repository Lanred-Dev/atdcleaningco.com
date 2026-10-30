import { randomUUID } from "node:crypto";
import { milliseconds } from "date-fns";
import { sessionsSchema, type Session, type User } from "#lib/server/db/auth.schema.ts";
import { db } from "#lib/server/db/index.ts";
import { eq } from "drizzle-orm";
import { ORIGIN } from "$app/env/private";
import type { RequestEvent } from "@sveltejs/kit";
import { dev } from "$app/env";
import { encryptSHA256 } from "./encryption";

function setSessionCookie(token: string, expiresAt: Date, cookies: RequestEvent["cookies"]) {
    cookies.set("session", token, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        domain: ORIGIN,
        secure: !dev,
        expires: expiresAt,
    });
}

function deleteSessionCookie(cookies: RequestEvent["cookies"]) {
    cookies.delete("session", { path: "/" });
}

/**
 * Creates a new session.
 *
 * @param user
 * @returns The session object
 */
export function createSession(user: User["id"], cookies: RequestEvent["cookies"]): Session {
    const token = randomUUID();
    const expiresAt = new Date(Date.now() + milliseconds({ days: 15 }));

    setSessionCookie(token, expiresAt, cookies);
    return db
        .insert(sessionsSchema)
        .values({
            token: encryptSHA256(token),
            expiresAt: expiresAt,
            user,
        })
        .returning()
        .get();
}

/**
 * Validates a session token and retrieves the associated user and session data.
 *
 * @param token
 * @returns An object containing the user and session if valid, or null if invalid or expired.
 */
export function validateSessionToken(
    token: Session["token"],
    cookies: RequestEvent["cookies"]
): Session | undefined {
    let session = db
        .select()
        .from(sessionsSchema)
        .where(eq(sessionsSchema.token, encryptSHA256(token)))
        .get();

    if (!session) return undefined;

    const expiresAt = session.expiresAt.getTime();

    // If true: session does exist BUT its expired, so delete it.
    if (Date.now() >= expiresAt) {
        deleteSession(token);
        return undefined;
    }

    // If the session is within 1 day of expiration, extend it by 5, because this session is still in use.
    if (Date.now() >= expiresAt - milliseconds({ days: 1 })) {
        session = db
            .update(sessionsSchema)
            .set({ expiresAt: new Date(expiresAt + milliseconds({ days: 5 })) })
            .where(eq(sessionsSchema.id, session.id))
            .returning()
            .get();
        setSessionCookie(token, session.expiresAt, cookies);
    }

    return session;
}

/**
 * Deletes a session.
 *
 * @param token
 */
export function deleteSession(token: Session["token"], cookies?: RequestEvent["cookies"]) {
    if (cookies) deleteSessionCookie(cookies);

    db.delete(sessionsSchema)
        .where(eq(sessionsSchema.token, encryptSHA256(token)))
        .run();
}
