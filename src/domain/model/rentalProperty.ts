import { Address } from "@model/address.ts";
import { UUID } from "node:crypto";

export class RentalProperty {
    readonly id: UUID;
    address: Address;
    rentalOwner: string; // later user aan vasthangen

    createdAt: Date;
    createdBy: string; // later user aan vasthangen
    updatedAt: Date;
    updatedBy: string;  // later user aan vasthangen
    rentalName: string;
    singleBeds: number;
    doubleBeds: number;
    storage: string;

    private constructor(
        id: UUID,
        address: Address,
        rentalOwner: string,
        createdAt: Date,
        createdBy: string,
        updatedAt: Date,
        updatedBy: string,
        rentalName: string,
        singleBeds: number,
        doubleBeds: number,
        storage: string
    ) {
        this.id = id;
        this.address = address;
        this.rentalOwner = rentalOwner;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.updatedAt = updatedAt;
        this.updatedBy = updatedBy;
        this.rentalName = rentalName;
        this.singleBeds = singleBeds;
        this.doubleBeds = doubleBeds;
        this.storage = storage;
    }

    static from = (
        id: UUID,
        address: Address,
        rentalOwner: string,
        createdAt: Date,
        createdBy: string,
        updatedAt: Date,
        updatedBy: string,
        rentalName: string,
        singleBeds: number,
        doubleBeds: number,
        storage: string
    ): RentalProperty => {

        return new RentalProperty(
            id,
            address,
            rentalOwner,
            createdAt,
            createdBy,
            updatedAt,
            updatedBy,
            rentalName,
            singleBeds,
            doubleBeds,
            storage
        );
    }
}
