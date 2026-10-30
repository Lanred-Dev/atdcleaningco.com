import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { resolve } from "$app/paths";
import { signInWithEmail } from "#lib/server/auth/index.ts";

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
            await signInWithEmail(email, password, event.cookies);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Invalid credentials";
            return fail(400, { message });
        }

        redirect(302, resolve("/admin/(protected)/(index)"));
    },
};
