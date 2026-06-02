import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const shortenedLinks = pgTable("shortened_links", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  slug: text("slug").notNull().unique(),
  originalUrl: text("original_url").notNull(),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type ShortenedLink = typeof shortenedLinks.$inferSelect;
export type NewShortenedLink = typeof shortenedLinks.$inferInsert;
