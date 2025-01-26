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

    private constructor( id: UUID, address: Address, rentalOwner: string, rentalName: string, singleBeds: number, doublebeds: number, storage: string ) {
        this.id = id;
        this.address = address,
        this.rentalOwner = rentalOwner;
        this.rentalName = rentalName;
        this.singleBeds = singleBeds;
        this.doubleBeds = doublebeds;
        this.storage = storage
    }

    static from = ( 
        id: UUID, 
        rentalOwner: string, 
        rentalName: string, 
        singleBeds: number, 
        doublebeds: number, 
        storage: string, 
        country: string, 
        city: string, 
        zipcode: string, 
        street: string, 
        houseNumber: string, 
        busNumber?: string ): RentalProperty =>
    {
        const address = new Address( country, city, zipcode, street, houseNumber, busNumber);
        return new RentalProperty( id, address, rentalOwner, rentalName, singleBeds, doublebeds, storage )
    }

    public changeAddress = ( country: string, city: string, zipCode: string, street: string, houseNumber: string, busNumber?: string ): void => {
        this.address = new Address(country, city, zipCode, street, houseNumber, busNumber)
    }
}