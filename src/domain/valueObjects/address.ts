export class Address {
    readonly country: string;
    readonly city: string;
    readonly zipcode: string;
    readonly street: string;
    readonly houseNumber: string;
    readonly busNumber?: string; 

    constructor(country: string, city: string, zipcode: string, street: string, houseNumber: string, busNumber?: string) {
        this.country = country;
        this.city = city;
        this.zipcode = zipcode;
        this.street = street;
        this.houseNumber = houseNumber;
        this.busNumber = busNumber;
    }
}