import { RentalProperty } from "@model/rentalProperty.ts";


export interface RentalPropertyReadService {
    getRentalPropertyById(id: string): Promise<RentalProperty | undefined>;
    getAllRentalProperties(): Promise<RentalProperty[]>;
}