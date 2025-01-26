export class Address {
    readonly country: string;
    readonly city: string;
    readonly postalCode: string;
    readonly street: string;
    readonly houseNumber: string;
    readonly busNumber?: string; 

    constructor(country: string, city: string, postalCode: string, street: string, houseNumber: string, busNumber?: string) {
        this.country = country;
        this.city = city;
        this.postalCode = postalCode;
        this.street = street;
        this.houseNumber = houseNumber;
        this.busNumber = busNumber;
    }
}