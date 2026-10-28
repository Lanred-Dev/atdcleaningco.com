import { fail, redirect } from "@sveltejs/kit";
import { auth } from "#lib/server/auth.ts";
import { APIError } from "better-auth/api";
import type { PageServerLoad, Actions } from "./$types";
import { resolve } from "$app/paths";

export const load: PageServerLoad = (event) => {
    if (event.locals.session) redirect(302, resolve("/admin/(protected)/(index)"));
};

export const actions: Actions = {
    signIn: async (event) => {
        const data = await event.request.formData();
        const email = data.get("email")?.toString().trim();
        const password = data.get("password")?.toString().trim();

        if (!email || !password) return fail(400, { message: "Missing required fields" });

        try {
            await auth.api.signInEmail({
                body: {
                    email,
                    password,
                    callbackURL: resolve("/admin/(protected)/(index)"),
                },
            });
        } catch (error) {
            if (error instanceof APIError)
                return fail(400, { message: error.message || "Signin failed" });

            return fail(500, { message: "Unexpected error" });
        }
    },
};
