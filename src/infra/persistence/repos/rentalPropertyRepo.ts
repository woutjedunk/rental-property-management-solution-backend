
import db from "@config/drizzle/db.ts";
import { rentalProperties, addresses } from "@config/drizzle/schema.ts";
import { RentalPropertyEntity } from "../dbEntities/rentalPropertyEntity.ts";

export class RentalPropertyRepo {

    async save(rentalPropertyEntity: RentalPropertyEntity): Promise<void> {
        const resultAddress = await db
            .insert(addresses)
            .values(rentalPropertyEntity.address!)
            .returning({ insertedId: addresses.id })


        await db
            .insert(rentalProperties)
            .values({
                ...rentalPropertyEntity,
                addressId: resultAddress[0].insertedId})
    }

    async getByRentalPropertyId(id: string): Promise<RentalPropertyEntity | undefined> {
        const result = await db.query.rentalProperties.findFirst({
            where: (rentalProperties, { eq }) => eq(rentalProperties.id, id),
            with: {
                address: true,
            }
        });
        return result;
    }

    async getAll(): Promise<RentalPropertyEntity[]> {
        const result = await db.query.rentalProperties.findMany();
        return result;
    }
}
