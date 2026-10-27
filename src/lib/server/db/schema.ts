import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const testimonialsSchema = sqliteTable("testimonials", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    location: text("location").notNull(),
    text: text("text").notNull(),
    createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
});

export const analyticsSourceSchema = sqliteTable("analyticsSource", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
});

export const analyticsSchema = sqliteTable("analytics", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userAgent: text("userAgent").notNull(),
    source: text("source")
        .references(() => analyticsSourceSchema.id)
        .notNull(),
    createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
});

export const DEFAULT_COMPANY_INFO = {
    id: 1,
    residentialPhone: "000-000-0000",
    commercialPhone: "000-000-0000",
    email: "contact@attentiontodetail.com",
    hours: {
        monday: [8, 17] as [number, number],
        tuesday: [8, 17] as [number, number],
        wednesday: [8, 17] as [number, number],
        thursday: [8, 17] as [number, number],
        friday: [8, 17] as [number, number],
        saturday: [9, 14] as [number, number],
        sunday: [0, 0] as [number, number],
    },
    serviceAreas: [],
    serviceAreasGeoJson: {
        type: "FeatureCollection" as const,
        bounds: [0, 0, 0, 0],
        features: [] as unknown[],
    },
};

export const companyInfoSchema = sqliteTable("companyInfo", {
    id: integer("id")
        .primaryKey()
        .$defaultFn(() => 1),
    residentialPhone: text("residentialPhone")
        .notNull()
        .default(DEFAULT_COMPANY_INFO.residentialPhone),
    commercialPhone: text("commercialPhone")
        .notNull()
        .default(DEFAULT_COMPANY_INFO.commercialPhone),
    email: text("email").notNull().default(DEFAULT_COMPANY_INFO.email),
    hours: text("hours", { mode: "json" })
        .$type<Record<string, [number, number]>>()
        .notNull()
        .default(DEFAULT_COMPANY_INFO.hours),
    serviceAreas: text("serviceAreas", { mode: "json" })
        .$type<string[]>()
        .notNull()
        .default(DEFAULT_COMPANY_INFO.serviceAreas),
    serviceAreasGeoJson: text("serviceAreasGeoJson", { mode: "json" })
        .$type<{
            type: "FeatureCollection";
            bounds: number[];
            features: unknown[];
        }>()
        .notNull()
        .default(DEFAULT_COMPANY_INFO.serviceAreasGeoJson),
});

export const contactInquiriesSchema = sqliteTable("contactInquiries", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    message: text("message").notNull(),
    service: text("service"),
    frequency: text("frequency"),
    location: text("location"),
    createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
});

export type ContactInquiry = typeof contactInquiriesSchema.$inferSelect;
export type Testimonial = typeof testimonialsSchema.$inferSelect;
export type Analytics = typeof analyticsSchema.$inferSelect;
export type AnalyticsSource = typeof analyticsSourceSchema.$inferSelect;
export type CompanyInfo = typeof companyInfoSchema.$inferSelect;

export * from "./auth.schema";
