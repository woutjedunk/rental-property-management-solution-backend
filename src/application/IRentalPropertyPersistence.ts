import { RentalProperty } from "@model/rentalProperty.ts"
import { UUID } from "node:crypto";

export interface IRentalPropertyPersistence {
    save(rentalProperty: RentalProperty): Promise<void>;
    getByRentalPropertyId(id: UUID): Promise<RentalProperty|undefined>;
    getAll(): Promise<RentalProperty[]>;
}