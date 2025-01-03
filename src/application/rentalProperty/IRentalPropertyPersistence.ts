import { RentalProperty } from "@model/rentalProperty.ts"
import { UUID } from "node:crypto";

export interface IRentalPropertyPersistence {
    save(rentalProperty: RentalProperty): Promise<void>;
    getByRentalPropertyId(id: string): Promise<RentalProperty|undefined>;
    getAll(): Promise<RentalProperty[]>;
}