import { IRentalPropertyPersistence } from "@application/IRentalPropertyPersistence.ts";
import { RentalProperty } from "@model/rentalProperty.ts";
import { DbAdapter } from "./DbAdapter.ts";
import { RentalPropertyEntity } from "./dbEntities/rentalPropertyEntity.ts";
import { RentalPropertyRepo } from "./repos/rentalPropertyRepo.ts";


export class RentalPropertyGateway implements IRentalPropertyPersistence {

    private readonly RentalPropertyAdapter: DbAdapter<RentalPropertyEntity, RentalProperty>;
    private readonly RentalPropertyRepo: RentalPropertyRepo;


    constructor(RentalPropertyAdapter: DbAdapter<RentalPropertyEntity, RentalProperty>, RentalPropertyRepo: RentalPropertyRepo) {
        this.RentalPropertyAdapter = RentalPropertyAdapter;
        this.RentalPropertyRepo = RentalPropertyRepo;
    }

    async save(rentalProperty: RentalProperty): Promise<void> {
        return await this.RentalPropertyRepo.save(this.RentalPropertyAdapter.mapToDb(rentalProperty));    
    }

    async getByRentalPropertyId(id: string): Promise<RentalProperty | undefined> {
        const rentalProperty = await this.RentalPropertyRepo.getByRentalPropertyId(id);
        if (!rentalProperty) {
            return undefined;
        }
        return this.RentalPropertyAdapter.mapToDomain(rentalProperty);
    }

    async getAll(): Promise<RentalProperty[]> {
        const rentalProperties = await this.RentalPropertyRepo.getAll()
        return this.RentalPropertyAdapter.mapToDomainList(rentalProperties);
    }

}