import { fail, redirect } from "@sveltejs/kit";
import { auth } from "#lib/server/auth.ts";
import { APIError } from "better-auth/api";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = (event) => {
    if (event.locals.user) {
        return redirect(302, "/admin");
    }

    return {};
};

export const actions: Actions = {
    signIn: async (event) => {
        const formData = await event.request.formData();
        const email = formData.get("email")?.toString() ?? "";
        const password = formData.get("password")?.toString() ?? "";

        try {
            await auth.api.signInEmail({
                body: {
                    email,
                    password,
                    callbackURL: "/auth/verification-success",
                },
            });
        } catch (error) {
            if (error instanceof APIError) {
                return fail(400, { message: error.message || "Signin failed" });
            }

            return fail(500, { message: "Unexpected error" });
        }

        return redirect(302, "/admin");
    },
};
