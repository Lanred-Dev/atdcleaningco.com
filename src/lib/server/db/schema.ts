import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const testimonialsSchema = sqliteTable("testimonials", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    location: text("location").notNull(),
    text: text("text").notNull(),
    createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
});

export const analyticsSchema = sqliteTable("analytics", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    path: text("path").notNull(),
    userAgent: text("userAgent"),
    createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
});

export type Testimonial = typeof testimonialsSchema.$inferSelect;
export type Analytics = typeof analyticsSchema.$inferSelect;

export * from "./auth.schema";
