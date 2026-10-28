import type { Handle } from "@sveltejs/kit/hooks";
import { eq } from "drizzle-orm";
import { trafficSourcesSchema, marketingCampaignsSchema } from "#lib/server/db/schema.ts";
import { db } from "#lib/server/db/index.ts";
import { redirect } from "@sveltejs/kit";

const SEARCH_ENGINES: string[] = [
    "google.com",
    "bing.com",
    "duckduckgo.com",
    "yahoo.com",
    "ecosia.org",
];

function isReferrerValid(referrer: string): boolean {
    for (let index = 0; index < SEARCH_ENGINES.length; index++) {
        if (referrer.includes(SEARCH_ENGINES[index])) return true;
    }

    return false;
}

export const handle: Handle = async ({ event, resolve }) => {
    if (event.request.method === "GET" && !event.url.pathname.startsWith("/admin")) {
        let sourceId = event.url.searchParams.get("source")?.toString().toLowerCase().trim();
        let wasSourceFromReferrer: boolean = false;

        if (typeof sourceId !== "string") {
            const referrer = event.request.headers.get("referer");

            if (referrer && isReferrerValid(referrer)) {
                wasSourceFromReferrer = true;
                sourceId = "web";
            }
        }

        if (typeof sourceId === "string") {
            const doesSourceExist = !!db
                .select({ id: marketingCampaignsSchema.id })
                .from(marketingCampaignsSchema)
                .where(eq(marketingCampaignsSchema.id, sourceId))
                .get();

            if (doesSourceExist) {
                const userAgent =
                    event.request.headers.get("user-agent")?.toString().trim() ?? "unknown";

                db.insert(trafficSourcesSchema)
                    .values({
                        userAgent,
                        source: sourceId,
                    })
                    .run();
            }

            if (!wasSourceFromReferrer) {
                event.url.searchParams.delete("source");
                const cleanedUrl: string = `${event.url.pathname}${event.url.search ?? ""}`;
                redirect(303, cleanedUrl);
            }
        }
    }

    return resolve(event);
};
