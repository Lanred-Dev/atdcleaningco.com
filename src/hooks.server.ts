import type { Handle } from "@sveltejs/kit/hooks";
import { sequence } from "@sveltejs/kit/hooks";
import { handle as analyticsHandle } from "#lib/server/analytics/handle.ts";
import { handle as authHandle } from "#lib/server/auth/handle.ts";
import { seedCompanyInfo, seedAdminUser, seedMarketingCampaigns } from "#lib/server/db/seed.ts";
import { runMigrations } from "#lib/server/db/migrate.ts";

runMigrations();
seedMarketingCampaigns();
seedAdminUser();
seedCompanyInfo();

export const handle: Handle = sequence(authHandle, analyticsHandle);
