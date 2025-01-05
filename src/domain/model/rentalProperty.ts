import { Address } from "@model/address.ts";
import { UUID } from "node:crypto";
import { z } from  "npm:zod";



export class RentalProperty {
    readonly id?: UUID;
    readonly address?: Address;
    readonly rentalOwner: string; // later user aan vasthangen

    readonly madeAt: Date;
    readonly madeBy: string; // later user aan vasthangen
    readonly editedAt: Date;
    readonly editedBy: string;  // later user aan vasthangen
    readonly rentalName: string;
    readonly singleBeds: number;
    readonly doubleBeds: number;
    readonly storage: string;

    private constructor(
        id: UUID,
        address: Address | undefined,
        rentalOwner: string,
        madeAt: Date,
        madeBy: string,
        editedAt: Date,
        editedBy: string,
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
        id: UUID,
        address: Address | undefined,
        rentalOwner: string,
        madeAt: Date,
        madeBy: string,
        editedAt: Date,
        editedBy: string,
        rentalName: string,
        singleBeds: number,
        doubleBeds: number,
        storage: string
    ): RentalProperty => {


        z.string().parse(rentalOwner);

        z.string().parse(madeBy);
        z.date().parse(madeAt);
        z.string().parse(editedBy);
        z.date().parse(editedAt);
        z.string().parse(rentalName);
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