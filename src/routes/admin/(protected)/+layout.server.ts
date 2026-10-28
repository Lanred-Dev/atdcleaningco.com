import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { resolve } from "$app/paths";

export const load: LayoutServerLoad = (event) => {
    if (!event.locals.user) redirect(302, resolve("/admin/login"));

    return { user: event.locals.user };
};
