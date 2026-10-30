import { createAccount } from "#lib/server/auth/accounts.ts";
import { createUser, deleteUser } from "#lib/server/auth/users.ts";
import { usersSchema } from "#lib/server/db/auth.schema.ts";
import { db } from "#lib/server/db/index.ts";
import type { PageServerLoad, Actions } from "./$types";
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

        try {
            deleteUser(id);
            return { success: true };
        } catch {
            return fail(400, "Failed to delete user");
        }
    },
    create: async ({ request }) => {
        const data = await request.formData();
        const name = data.get("name")?.toString().trim();
        const email = data.get("email")?.toString().trim();
        const password = data.get("password")?.toString().trim();
        const role = data.get("role")?.toString().trim() as "admin" | "user";

        if (!name || !email || !password || !role)
            return fail(400, { error: "Missing required fields" });

        const user = createUser({
            email,
            name,
            role,
        });

        await createAccount({
            provider: "credential",
            password,
            user: user.id,
        });

        return { success: true };
    },
};
