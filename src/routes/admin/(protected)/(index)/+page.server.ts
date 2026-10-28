import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { resolve } from "$app/paths";

export const load: PageServerLoad = (event) => {
    if (event.locals.user?.role === "admin")
        redirect(302, resolve("/admin/(protected)/admin/home"));
    else redirect(302, resolve("/admin/(protected)/staff/home"));
};
