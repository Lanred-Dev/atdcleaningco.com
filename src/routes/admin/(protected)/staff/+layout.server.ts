import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { resolve } from "$app/paths";

export const load: LayoutServerLoad = (event) => {
    if (event.locals.user?.role === "admin") redirect(302, resolve("/admin/(protected)/admin/home"))
};
