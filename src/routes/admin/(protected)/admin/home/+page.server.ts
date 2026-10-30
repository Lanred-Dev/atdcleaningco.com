import type { PageServerLoad } from "./$types";
import { trafficSourcesSchema, marketingCampaignsSchema } from "#lib/server/db/schema.ts";
import { sql, count } from "drizzle-orm";
import { db } from "#lib/server/db/index.ts";

export const load: PageServerLoad = () => {
    const rows = db
        .select({
            date: sql<string>`date(${trafficSourcesSchema.createdAt}, 'unixepoch')`.as("date"),
            source: trafficSourcesSchema.source,
            count: count(trafficSourcesSchema.id),
        })
        .from(trafficSourcesSchema)
        .groupBy(
            sql`date(${trafficSourcesSchema.createdAt}, 'unixepoch')`,
            trafficSourcesSchema.source
        )
        .orderBy(sql`date(${trafficSourcesSchema.createdAt}, 'unixepoch')`)
        .all();

    const marketingCampaigns = db.select().from(marketingCampaignsSchema).all();
    const dateMap = new Map<string, Record<string, unknown>>();

    for (const { date, source, count } of rows) {
        if (!dateMap.has(date)) {
            const entry: Record<string, unknown> = { date };
            for (const { id } of marketingCampaigns) entry[id] = 0;
            dateMap.set(date, entry);
        }

        dateMap.get(date)![source ?? "unknown"] = count;
    }

    return {
        trafficSources: Array.from(dateMap.values()),
        marketingCampaigns,
    };
};
