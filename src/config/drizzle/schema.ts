import { pgTable, pgSchema, varchar, uuid } from "drizzle-orm/pg-core";

export const schema = pgSchema("public");

export const rentalPropertiesTable = schema.table("rental_properties", {
    id: uuid().primaryKey(),
    addressId: uuid().references(() => addressesTable.id),
    rentalOwner: varchar(),
    madeAt: varchar(),
    madeBy: varchar(),
    editedAt: varchar(),
    editedBy: varchar(),
    rentalName: varchar(),
    singleBeds: varchar(),
    doubleBeds: varchar(),
    storage: varchar(),
});

export const addressesTable = schema.table("addresses", {
    id: uuid().primaryKey(),
    country: varchar(),
    city: varchar(),
    postalCode: varchar(),
    street: varchar(),
    streetNumber: varchar(),
});