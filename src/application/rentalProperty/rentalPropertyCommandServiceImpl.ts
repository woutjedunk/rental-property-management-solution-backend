import { RentalProperty } from "@model/rentalProperty.ts";
import { RentalPropertyCommandService } from "@controller/rentalProperty/commandService.ts";
import { IRentalPropertyPersistence } from "@application/rentalProperty/IRentalPropertyPersistence.ts";

class RentalPropertyComandService implements RentalPropertyCommandService {

    private rentalPropertyPersistence: IRentalPropertyPersistence;
    
    constructor(rentalPropertyPersistence: IRentalPropertyPersistence) {
        this.rentalPropertyPersistence = rentalPropertyPersistence;
    }

    async createRentalProperty(rentalProperty: RentalProperty): Promise<void> {
        await this.rentalPropertyPersistence.save(rentalProperty);
    }
    async updateRentalProperty(rentalProperty: RentalProperty): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async deleteRentalProperty(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}