import { RentalProperty } from "@model/rentalProperty.ts"

export interface IRentalPropertyPersistence {
    save(rentalProperty: RentalProperty): Promise<RentalProperty>;
    getByRentalPropertyId(id: string): Promise<RentalProperty|undefined>;
    getAll(): Promise<RentalProperty[]>;
}