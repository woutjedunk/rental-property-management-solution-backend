import { Address } from "@model/address.ts";
import { addresses } from "@config/drizzle/schema.ts";
import { UUID } from "node:crypto";


type AddressDbModel = typeof addresses.$inferSelect;

export const addressMapper = {
    toDomain: (row: AddressDbModel): Address => {
        return Address.from(
            row.id as UUID,
            row.country,
            row.city,
            row.postalCode,
            row.street,
            row.streetNumber
        );
    },

    toPersistence: (address: Address): AddressDbModel => {
        return {
            id: address.id,
            country: address.country,
            city: address.city,
            postalCode: address.postalCode,
            street: address.street,
            streetNumber: address.streetNumber,
        };
    },
};