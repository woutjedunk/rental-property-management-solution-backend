import { pgTable, varchar, uuid,  } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";



export const rentalProperties = pgTable("rental_properties", {
    id: uuid().primaryKey(),
    addressId: uuid().references(() => addresses.id).notNull(),
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
export const rentalPropertiesRelations = relations(rentalProperties, ({ one }) => ({
    address: one(addresses, {
        fields: [rentalProperties.addressId],
        references: [addresses.id],
    })
}))

export const addresses = pgTable("addresses", {
    id: uuid().primaryKey(),
    country: varchar().notNull(),
    city: varchar().notNull(),
    postalCode: varchar().notNull(),
    street: varchar().notNull(),
    streetNumber: varchar().notNull(),
});