import { z } from 'zod';



const AddressSchema = z.object({
    country: z.string().max(32),
    city: z.string().max(32),
    postalCode: z.string().max(16),
    street: z.string().max(64),
    streetNumber: z.string().max(16),
});

export type AddressJSON = {
    country: string;
    city: string;
    postalCode: string;
    street: string;
    streetNumber: string;
}

export class Address {
    readonly country: string;
    readonly city: string;
    readonly postalCode: string;
    readonly street: string;
    readonly streetNumber: string;

    constructor(country: string, city: string, postalCode: string, street: string, streetNumber: string) {
        this.country = country;
        this.city = city;
        this.postalCode = postalCode;
        this.street = street;
        this.streetNumber = streetNumber;
    }

    static from(address: AddressJSON) {

        AddressSchema.parse(address);
    
        return new Address(
            address.country.toLowerCase(),
            address.city.toLowerCase(),
            address.postalCode.toLowerCase(),
            address.street.toLowerCase(),
            address.streetNumber.toLowerCase()
        );
    }
}
