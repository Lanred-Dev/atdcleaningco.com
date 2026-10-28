import { db } from "#lib/server/db/index.ts";
import { marketingCampaignsSchema } from "#lib/server/db/schema.ts";

export function initialize() {
    try {
        db.insert(marketingCampaignsSchema)
            .values({
                name: "web",
                id: "web",
                isCore: true,
            })
            .onConflictDoNothing()
            .run();
    } catch {
        console.error("Failed to insert default company info. It may already exist.");
    }
}
