import db from "@config/drizzle/db.ts"
import { RentalPropertyRepository } from "@service/rental-property-service.ts"
import { rentalPropertyMapper } from "../mappers/rental-property-mapper.ts"
import { addressMapper } from "@mapper/address-mapper.ts"
import { addresses, rentalProperties } from "@config/drizzle/schema.ts";
import { RentalProperty } from "@model/rentalProperty.ts";
import { UUID } from "node:crypto";



export const rentalPropertyRepository: RentalPropertyRepository = {

    save: async (rentalPropertie: RentalProperty) => {
        const rentalPropertyDb = rentalPropertyMapper.toPersistence(rentalPropertie)
        const addressDb = addressMapper.toPersistence(rentalPropertie.address!)

        const addressId = await db.insert(addresses)
            .values(addressDb)
            .returning({ 
                insertedId: addresses.id 
            })

        await db.insert(rentalProperties)
            .values({
                ...rentalPropertyDb,
                addressId: addressId[0].insertedId
            })
    },

    getAll: async () => {
        const data = await db.query.rentalProperties.findMany({
            with: {
                address: true
            }
        })

        return data.map(rentalPropertyMapper.toDomain)
    },

    getById: async (id: UUID) => {
        

        const data = await db.query.rentalProperties.findFirst({
            where: (rentalProperties, { eq }) => eq(rentalProperties.id, id),
            with: {
                address: true
            }
        })


        if (!data) throw new Error('Rental property not found');

        return rentalPropertyMapper.toDomain(data)
    },  
}
