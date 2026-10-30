import { db } from "#lib/server/db/index.ts";
import { marketingCampaignsSchema } from "#lib/server/db/schema.ts";
import type { PageServerLoad, Actions } from "./$types";
import { asc, eq } from "drizzle-orm";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = () => {
    const campaigns = db
        .select()
        .from(marketingCampaignsSchema)
        .orderBy(asc(marketingCampaignsSchema.createdAt))
        .all();

    return {
        campaigns,
    };
};

export const actions: Actions = {
    delete: async ({ request }) => {
        const data = await request.formData();
        const id = data.get("id") as string;

        db.delete(marketingCampaignsSchema)
            .where(eq(marketingCampaignsSchema.id, id))
            .run();

        return { success: true };
    },
    create: async ({ request }) => {
        const data = await request.formData();
        const id = data
            .get("id")
            ?.toString()
            .trim()
            .toLowerCase()
            .replaceAll(" ", "_")
            .replaceAll(/[0-9]/g, "");
        const name = data.get("name")?.toString().trim();

        if (!name || !id) return fail(400, { error: "Missing required fields" });

        db.insert(marketingCampaignsSchema)
            .values({
                id,
                name,
            })
            .run();

        return { success: true };
    },
};
