import { UUID } from "node:crypto";
import { Address } from "@domain/valueObjects/address.ts";


export class RentalProperty {
    readonly id: UUID
    address: Address;
    rentalOwner: string; // later user aan vasthangen

    rentalName: string;
    singleBeds: number;
    doubleBeds: number;
    storage: string;

    constructor(id: UUID, address: Address, rentalOwner: string, rentalName: string, singleBeds: number, doublebeds: number, storage: string) {
        this.id = id;
        this.address = address,
        this.rentalOwner = rentalOwner;
        this.rentalName = rentalName;
        this.singleBeds = singleBeds;
        this.doubleBeds = doublebeds;
        this.storage = storage
    }
}