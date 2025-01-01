import { RentalProperty } from "@model/rentalProperty.ts"
import { RentalPropertyEntity } from "../dbEntities/rentalPropertyDrizzle.ts";
import { UUID } from "node:crypto";
import { AddressAdapter } from "./AddressAdapter.ts";

export class RentalPropertyAdapter {

    private static instance: RentalPropertyAdapter;

    private constructor() {} 

    static getInstance(): RentalPropertyAdapter {
        if (!RentalPropertyAdapter.instance) {
            RentalPropertyAdapter.instance = new RentalPropertyAdapter();
        }
        return RentalPropertyAdapter.instance;
    }

    mapToDomain(row: RentalPropertyEntity): RentalProperty {
        return RentalProperty.from(
            row.id as UUID,
            row.address ? AddressAdapter.getInstance().mapToDomain(row.address) : undefined,
            row.rentalOwner || "",
            new Date(row.madeAt),
            row.madeBy,
            new Date(row.editedAt),
            row.editedBy,
            row.rentalName,
            Number(row.singleBeds),
            Number(row.doubleBeds),
            row.storage
        );
    }

    mapToDb()
}