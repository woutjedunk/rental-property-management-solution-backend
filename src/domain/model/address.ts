import { randomUUID, UUID } from "node:crypto";
import { z } from 'zod';



const AddressSchema = z.object({
    id: z.string().uuid(),
    country: z.string().max(32),
    city: z.string().max(32),
    postalCode: z.string().max(16),
    street: z.string().max(64),
    streetNumber: z.string().max(16),
});

export class Address {
    readonly id: UUID;
    readonly country: string;
    readonly city: string;
    readonly postalCode: string;
    readonly street: string;
    readonly streetNumber: string;

    constructor(id: UUID, country: string, city: string, postalCode: string, street: string, streetNumber: string) {
        this.id = id;
        this.country = country;
        this.city = city;
        this.postalCode = postalCode;
        this.street = street;
        this.streetNumber = streetNumber;
    }

    static from = (data: z.infer<typeof AddressSchema>): Address => {
        AddressSchema.parse(data);
        return new Address(
            randomUUID(), 
            data.country.toLowerCase(),
            data.city.toLowerCase(), 
            data.postalCode.toLowerCase(), 
            data.street.toLocaleLowerCase(), 
            data.streetNumber.toLocaleLowerCase());
    }
}
