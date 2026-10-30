import { relations, sql } from "drizzle-orm";
import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { randomUUID } from "node:crypto";

export const usersSchema = sqliteTable("users", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => randomUUID()),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .default(sql`(unixepoch())`),
    role: text("role").notNull(),
    inquiryNotifcationPreference: integer("inquiry_notification_preference", {
        mode: "boolean",
    })
        .notNull()
        .default(sql`0`),
});

export type User = typeof usersSchema.$inferSelect;
export type NewUser = typeof usersSchema.$inferInsert;

export const accountsSchema = sqliteTable(
    "accounts",
    {
        id: integer("id").primaryKey({ autoIncrement: true }),
        user: text("user")
            .notNull()
            .references(() => usersSchema.id, { onDelete: "cascade" }),
        provider: text("provider").notNull().$type<"credential">(),
        providerAccountId: text("provider_account_id"),
        password: text("password"),
        accessToken: text("access_token"),
        refreshToken: text("refresh_token"),
    },
    (table) => [index("account_user_index").on(table.user)]
);

export type Account = typeof accountsSchema.$inferSelect;
export type NewAccount = typeof accountsSchema.$inferInsert;

export const sessionsSchema = sqliteTable(
    "sessions",
    {
        id: text("id")
            .primaryKey()
            .$defaultFn(() => randomUUID()),
        expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
        token: text("token").notNull().unique(),
        user: text("user")
            .notNull()
            .references(() => usersSchema.id, { onDelete: "cascade" }),
    },
    (table) => [index("session_user_index").on(table.user)]
);

export type Session = typeof sessionsSchema.$inferSelect;
export type NewSession = typeof sessionsSchema.$inferInsert;

export const sessionRelations = relations(sessionsSchema, ({ one }) => ({
    user: one(usersSchema, {
        fields: [sessionsSchema.user],
        references: [usersSchema.id],
    }),
}));

export const usersRelations = relations(usersSchema, ({ many }) => ({
    sessions: many(sessionsSchema),
}));
