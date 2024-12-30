import { RentalProperty } from "@model/rentalProperty.ts"

interface IRentalPropertyPersistence {
    save(rentalProperty: RentalProperty): void;
    update(rentalProperty: RentalProperty): void;
    delete(rentalProperty: RentalProperty): void;
    getById(id: string): RentalProperty;
    getByOwner(owner: string): RentalProperty[];
    getAll(): RentalProperty[];
}