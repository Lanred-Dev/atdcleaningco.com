import { db } from "#lib/server/db/index.ts";
import type { PageServerLoad, Actions } from "./$types";
import { user as usersSchema } from "#lib/server/db/auth.schema.ts";
import { auth } from "#lib/server/auth.ts";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = () => {
    const staff = db.select().from(usersSchema).all();

    return {
        staff,
    };
};

export const actions: Actions = {
    delete: async ({ request }) => {
        const data = await request.formData();
        const id = data.get("id") as string;

        await auth.api.removeUser({
            body: {
                userId: id,
            },
            headers: request.headers,
        });

        return { success: true };
    },
    create: async ({ request }) => {
        const data = await request.formData();
        const name = data.get("name")?.toString().trim();
        const email = data.get("email")?.toString().trim();
        const password = data.get("password")?.toString().trim();
        const role = data.get("role")?.toString().trim() as "admin" | "user";

        if (!name || !email || !password || !role)
            return fail(400, { error: "Missing required fields" });

        await auth.api.createUser({
            body: {
                email,
                password,
                name,
                role,
            },
        });

        return { success: true };
    },
};
