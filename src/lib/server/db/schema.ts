import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import randomRGB from "#lib/utils/color/randomRGB.ts";

export const testimonialsSchema = sqliteTable("testimonials", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    location: text("location").notNull(),
    text: text("text").notNull(),
    createdAt: integer("createdAt", { mode: "timestamp" })
        .notNull()
        .default(sql`(unixepoch())`),
});

export type Testimonial = typeof testimonialsSchema.$inferSelect;
export type NewTestimonial = typeof testimonialsSchema.$inferInsert;

export const marketingCampaignsSchema = sqliteTable("marketingCampaigns", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    isCore: integer("is_core", { mode: "boolean" })
        .notNull()
        .default(sql`0`),
    displayColor: text("display_color")
        .notNull()
        .$defaultFn(() => randomRGB()),
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .default(sql`(unixepoch())`),
});

export type MarketingCampaign = typeof marketingCampaignsSchema.$inferSelect;
export type NewMarketingCampaign = typeof marketingCampaignsSchema.$inferInsert;

export const trafficSourcesSchema = sqliteTable("trafficSources", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userAgent: text("user_agent").notNull(),
    source: text("source")
        .references(() => marketingCampaignsSchema.id, { onDelete: "cascade" })
        .notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .default(sql`(unixepoch())`),
});

export type TrafficSource = typeof trafficSourcesSchema.$inferSelect;
export type NewTrafficSource = typeof trafficSourcesSchema.$inferInsert;

export const companyInfoSchema = sqliteTable("companyInfo", {
    id: integer("id")
        .primaryKey()
        .$defaultFn(() => 1),
    residentialPhone: text("residential_phone").notNull().default("(000) 000-0000"),
    commercialPhone: text("commercial_phone").notNull().default("(000) 000-0000"),
    email: text("email").notNull().default("something@hello.com"),
    hours: text("hours", { mode: "json" })
        .$type<Record<string, [number, number]>>()
        .notNull()
        .default({
            monday: [8, 17],
            tuesday: [8, 17],
            wednesday: [8, 17],
            thursday: [8, 17],
            friday: [8, 17],
            saturday: [9, 14],
            sunday: [0, 0],
        }),
    serviceAreas: text("service_areas", { mode: "json" }).$type<string[]>().notNull().default([]),
    serviceAreasGeoJson: text("service_areas_geojson", { mode: "json" })
        .$type<{
            type: "FeatureCollection";
            bounds: number[];
            features: unknown[];
        }>()
        .notNull()
        .default({
            type: "FeatureCollection" as const,
            bounds: [0, 0, 0, 0],
            features: [] as unknown[],
        }),
});

export type CompanyInfo = typeof companyInfoSchema.$inferSelect;

export const contactInquiriesSchema = sqliteTable("contactInquiries", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    message: text("message").notNull(),
    service: text("service"),
    frequency: text("frequency"),
    location: text("location"),
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .default(sql`(unixepoch())`),
});

export type ContactInquiry = typeof contactInquiriesSchema.$inferSelect;
export type NewContactInquiry = typeof contactInquiriesSchema.$inferInsert;

export * from "./auth.schema"