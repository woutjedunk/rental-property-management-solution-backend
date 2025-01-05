import { pgTable, varchar, uuid, timestamp, integer,   } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";



export const rentalProperties = pgTable("rental_properties", {
    id: uuid().primaryKey().defaultRandom(),
    addressId: uuid().references(() => addresses.id).notNull(),
    rentalOwner: varchar().notNull(),
    madeAt: timestamp({precision: 0, withTimezone: true}).defaultNow(),
    madeBy: varchar(),
    editedAt: timestamp({precision: 0, withTimezone: true}).defaultNow(),
    editedBy: varchar(),
    rentalName: varchar().notNull(),
    singleBeds: integer().notNull(),
    doubleBeds: integer().notNull(),
    storage: varchar().notNull(),
});
export const rentalPropertiesRelations = relations(rentalProperties, ({ one }) => ({
    address: one(addresses, {
        fields: [rentalProperties.addressId],
        references: [addresses.id],
    })
}))

export const addresses = pgTable("addresses", {
    id: uuid().primaryKey().defaultRandom(),
    country: varchar().notNull(),
    city: varchar().notNull(),
    postalCode: varchar().notNull(),
    street: varchar().notNull(),
    streetNumber: varchar().notNull(),
});