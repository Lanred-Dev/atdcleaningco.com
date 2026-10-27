import { db } from "#lib/server/db/index.ts";
import {
    analyticsSourceSchema,
    analyticsSchema,
    type AnalyticsSource,
} from "#lib/server/db/schema.ts";
import type { PageServerLoad, Actions } from "./$types";
import { desc, eq } from "drizzle-orm";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
    const analyticsSources: AnalyticsSource[] = await db
        .select()
        .from(analyticsSourceSchema)
        .orderBy(desc(analyticsSourceSchema.createdAt));

    return {
        analyticsSources,
    };
};

export const actions: Actions = {
    deleteAnalyticsSource: async ({ request }) => {
        const data = await request.formData();
        const id = data.get("id") as string;

        db.delete(analyticsSchema).where(eq(analyticsSchema.source, id)).run();
        db.delete(analyticsSourceSchema).where(eq(analyticsSourceSchema.id, id)).run();

        return { success: true };
    },
    createAnalyticsSource: async ({ request }) => {
        const data = await request.formData();
        const id = data.get("id")?.toString().trim();
        const name = data.get("name")?.toString().trim();

        if (!name || !id) return fail(400, { error: "Missing required fields" });

        db.insert(analyticsSourceSchema)
            .values({
                id,
                name,
                createdAt: new Date(),
            })
            .run();

        return { success: true };
    },
};
