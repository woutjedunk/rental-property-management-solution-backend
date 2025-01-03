import { RentalProperty } from "@model/rentalProperty.ts";

export interface RentalPropertyCommandService {
    createRentalProperty(rentalProperty: RentalProperty): Promise<void>;
    updateRentalProperty(rentalProperty: RentalProperty): Promise<void>;
    deleteRentalProperty(id: string): Promise<void>;
}