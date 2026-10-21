import { ORIGIN, BETTER_AUTH_SECRET } from "$app/env/private";
import { betterAuth } from "better-auth/minimal";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";
import { db } from "#lib/server/db/index.ts";
import { admin } from "better-auth/plugins/admin";

export const auth = betterAuth({
    baseURL: ORIGIN,
    secret: BETTER_AUTH_SECRET,
    database: drizzleAdapter(db, { provider: "sqlite" }),
    emailAndPassword: { enabled: true, disableSignUp: false, requireEmailVerification: false },
    plugins: [admin(), sveltekitCookies(getRequestEvent)],
    rateLimit: {
        enabled: true,
        window: 120,
        max: 5,
    },
});
