import { pgTable, varchar, uuid,  } from "drizzle-orm/pg-core";



export const rentalPropertiesTable = pgTable("rental_properties", {
    id: uuid().primaryKey(),
    addressId: uuid().references(() => addressesTable.id).notNull(),
    rentalOwner: varchar().notNull(),
    madeAt: varchar().notNull(),
    madeBy: varchar().notNull(),
    editedAt: varchar().notNull(),
    editedBy: varchar().notNull(),
    rentalName: varchar().notNull(),
    singleBeds: varchar().notNull(),
    doubleBeds: varchar().notNull(),
    storage: varchar().notNull(),
});

export const addressesTable = pgTable("addresses", {
    id: uuid().primaryKey(),
    country: varchar().notNull(),
    city: varchar().notNull(),
    postalCode: varchar().notNull(),
    street: varchar().notNull(),
    streetNumber: varchar().notNull(),
});