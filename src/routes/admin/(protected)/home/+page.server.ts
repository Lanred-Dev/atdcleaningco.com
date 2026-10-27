import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { auth } from "#lib/server/auth.ts";
import { analyticsSchema } from "#lib/server/db/schema.ts";
import { sql, count } from "drizzle-orm";
import { db } from "#lib/server/db/index.ts";

export const load: PageServerLoad = async () => {
    const rows = db
        .select({
            date: sql<string>`date(${analyticsSchema.createdAt}, 'unixepoch')`.as("date"),
            source: analyticsSchema.source,
            count: count(analyticsSchema.id),
        })
        .from(analyticsSchema)
        .groupBy(sql`date(${analyticsSchema.createdAt}, 'unixepoch')`, analyticsSchema.source)
        .orderBy(sql`date(${analyticsSchema.createdAt}, 'unixepoch')`)
        .all();

    const sources = [...new Set(rows.map((analytics) => analytics.source ?? "unknown"))];
    const dateMap = new Map<string, Record<string, unknown>>();

    for (const { date, source, count } of rows) {
        if (!dateMap.has(date)) {
            const entry: Record<string, unknown> = { date };
            for (const source of sources) entry[source] = 0;
            dateMap.set(date, entry);
        }

        dateMap.get(date)![source ?? "unknown"] = count;
    }

    return {
        analytics: Array.from(dateMap.values()),
        sources,
    };
};

export const actions: Actions = {
    signOut: async (event) => {
        await auth.api.signOut({
            headers: event.request.headers,
        });

        return redirect(302, "/admin/login");
    },
};
