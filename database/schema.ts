import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, text } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    active: boolean("active").default(false),
});

export const userRelations = relations(userTable, ({ one }) => ({
    org: one(orgTable, {
        fields: [userTable.id],
        references: [orgTable.id],
    }),
}));

// Example of defining a schema in Drizzle ORM:
export const orgTable = pgTable("todos", {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    text: text("text").notNull(),
});

export const orgRelations = relations(orgTable, ({ one, many }) => ({
    users: many(userTable),
    admin: one(userTable),
}));

// You can then infer the types for selecting and inserting
// its free dto basically?
export type OrgItem = typeof orgTable.$inferSelect;
export type OrgInsert = typeof orgTable.$inferInsert;
export type UserItem = typeof userTable.$inferSelect;
export type UserInsert = typeof userTable.$inferInsert;
