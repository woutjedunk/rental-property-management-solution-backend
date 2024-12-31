import { pgTable, varchar, uuid } from "drizzle-orm/pg-core";

export const table = pgTable("address", {
    id: uuid().primaryKey(),
    country: varchar(),
    city: varchar(),
    postalCode: varchar(),
    street: varchar(),
    streetNumber: varchar(),
});