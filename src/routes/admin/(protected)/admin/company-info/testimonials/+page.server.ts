import { db } from "#lib/server/db/index.ts";
import { testimonialsSchema } from "#lib/server/db/schema.ts";
import type { PageServerLoad, Actions } from "./$types";
import { asc, eq } from "drizzle-orm";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = () => {
    const testimonials = db
        .select()
        .from(testimonialsSchema)
        .orderBy(asc(testimonialsSchema.createdAt))
        .all();

    return {
        testimonials,
    };
};

export const actions: Actions = {
    delete: async ({ request }) => {
        const data = await request.formData();
        const id = data.get("id") as string;

        db.delete(testimonialsSchema).where(eq(testimonialsSchema.id, id)).run();

        return { success: true };
    },
    create: async ({ request }) => {
        const data = await request.formData();
        const name = data.get("name")?.toString().trim();
        const location = data.get("location")?.toString().trim();
        const text = data.get("text")?.toString().trim();

        if (!name || !location || !text) return fail(400, { error: "Missing required fields" });

        db.insert(testimonialsSchema)
            .values({
                name,
                location,
                text,
            })
            .run();

        return { success: true };
    },
    update: async ({ request }) => {
        const data = await request.formData();
        const id = data.get("id") as string;
        const name = data.get("name") as string;
        const location = data.get("location") as string;
        const text = data.get("text") as string;

        db.update(testimonialsSchema)
            .set({
                name,
                location,
                text,
            })
            .where(eq(testimonialsSchema.id, id))
            .run();

        return { success: true };
    },
};
