import { Address } from "@model/address.ts";
import { UUID } from "node:crypto";
import { z } from  "npm:zod";



export class RentalProperty {
    readonly id?: UUID;
    readonly address?: Address;
    readonly rentalOwner: string; // later user aan vasthangen

    readonly madeAt?: Date;
    readonly madeBy?: string; // later user aan vasthangen
    readonly editedAt?: Date;
    readonly editedBy?: string;  // later user aan vasthangen
    readonly rentalName: string;
    readonly singleBeds: number;
    readonly doubleBeds: number;
    readonly storage: string;

    private constructor(
        id: UUID | undefined,
        address: Address | undefined,
        rentalOwner: string,
        madeAt: Date | undefined,
        madeBy: string | undefined,
        editedAt: Date | undefined, 
        editedBy: string | undefined,
        rentalName: string,
        singleBeds: number,
        doubleBeds: number,
        storage: string
    ) {
        this.id = id;
        this.address = address;
        this.rentalOwner = rentalOwner;
        this.madeAt = madeAt;
        this.madeBy = madeBy;
        this.editedAt = editedAt;
        this.editedBy = editedBy;
        this.rentalName = rentalName;
        this.singleBeds = singleBeds;
        this.doubleBeds = doubleBeds;
        this.storage = storage;
    }

    static from = (
        id: UUID | undefined,
        address: Address | undefined,
        rentalOwner: string,
        madeAt: Date | undefined,
        madeBy: string | undefined,
        editedAt: Date | undefined,
        editedBy: string |undefined,
        rentalName: string,
        singleBeds: number,
        doubleBeds: number,
        storage: string
    ): RentalProperty => {

        z.string().parse(rentalOwner);

        z.number().int().parse(singleBeds);
        z.number().int().parse(doubleBeds);
        z.string().parse(storage);

        return new RentalProperty(
            id,
            address,
            rentalOwner,
            madeAt,
            madeBy,
            editedAt,
            editedBy,
            rentalName,
            singleBeds,
            doubleBeds,
            storage
        );
    }
}