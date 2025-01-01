import { DbAdapter } from "../DbAdapter.ts";
import { Address } from "@model/address.ts"
import { AddressEntity } from "../dbEntities/addressEntity.ts";
import { UUID } from "node:crypto";


export class AddressAdapter implements DbAdapter<AddressEntity,Address> {

    private static instance: AddressAdapter;

    private constructor() {}

    static getInstance(): AddressAdapter {
        if (!AddressAdapter.instance) {
            AddressAdapter.instance = new AddressAdapter();
        }
        return AddressAdapter.instance;
    }

    mapToDomain(row: AddressEntity): Address {
        return Address.from(
            row.id as UUID, 
            row.country || "", 
            row.city || "", 
            row.postalCode || "", 
            row.street || "", 
            row.streetNumber || "");
    }

    mapToDb(domain: Address): AddressEntity {
        return {
            id: domain.id,
            country: domain.country,
            city: domain.city,
            postalCode: domain.postalCode,
            street: domain.street,
            streetNumber: domain.streetNumber
        }
    }
}