import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { resolve } from "$app/paths";
import { signOut } from "#lib/server/auth/index.ts";

export const load: PageServerLoad = (event) => {
    if (!event.locals.session) return redirect(302, resolve("/admin/sign-in"));

    signOut(event.locals.session.id, event.cookies);
    redirect(302, resolve("/admin/sign-in"));
};
