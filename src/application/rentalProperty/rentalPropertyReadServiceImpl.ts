import { IRentalPropertyPersistence } from "@application/rentalProperty/IRentalPropertyPersistence.ts";
import { RentalProperty } from "@model/rentalProperty.ts";
import { RentalPropertyReadService } from "@controller/rentalProperty/readService.ts";

class RentalPropertyReadServiceImpl implements RentalPropertyReadService {
    private rentalPropertyPersistence: IRentalPropertyPersistence;

    constructor(rentalPropertyPersistence: IRentalPropertyPersistence) {
        this.rentalPropertyPersistence = rentalPropertyPersistence;
    }
    async getRentalPropertyById(id: string): Promise<RentalProperty | undefined> {
        return await this.rentalPropertyPersistence.getByRentalPropertyId(id);
    }
    async getAllRentalProperties():  Promise<RentalProperty[]> {
        return await this.rentalPropertyPersistence.getAll();
    }
}