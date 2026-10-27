import type { Handle } from "@sveltejs/kit/hooks";
import { building } from "$app/env";
import { auth } from "#lib/server/auth.ts";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { sequence } from "@sveltejs/kit/hooks";
import { eq } from "drizzle-orm";
import { analyticsSchema, analyticsSourceSchema } from "#lib/server/db/schema.ts";
import { db } from "./lib/server/db";
import { redirect } from "@sveltejs/kit";

const handleBetterAuth: Handle = async ({ event, resolve }) => {
    const session = await auth.api.getSession({ headers: event.request.headers });

    if (session) {
        event.locals.session = session.session;
        event.locals.user = session.user;
    }

    return svelteKitHandler({ event, resolve, auth, building });
};

const handleAnalytics: Handle = async ({ event, resolve }) => {
    if (event.request.method === "GET" && !event.url.pathname.startsWith("/admin")) {
        const sourceId = event.url.searchParams.get("source")?.toString().trim();

        if (typeof sourceId === "string") {
            const source = db
                .select()
                .from(analyticsSourceSchema)
                .where(eq(analyticsSourceSchema.id, sourceId.toLowerCase()))
                .get();

            if (source) {
                const userAgent = event.request.headers.get("user-agent")?.toString().trim() ?? "";
                db.insert(analyticsSchema)
                    .values({
                        userAgent,
                        source: source.id,
                        createdAt: new Date(),
                    })
                    .run();

                event.url.searchParams.delete("source");
                const cleanUrl = event.url.pathname + (event.url.search ? event.url.search : "");
                redirect(303, cleanUrl);
            }
        }
    }

    return resolve(event);
};

export const handle: Handle = sequence(handleBetterAuth, handleAnalytics);
