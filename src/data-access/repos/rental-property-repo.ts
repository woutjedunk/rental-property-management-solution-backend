import db from "@config/drizzle/db.ts"
import { RentalPropertyRepository } from "@service/rental-property-service.ts"
import { rentalPropertyMapper } from "../mappers/rental-property-mapper.ts"

const mapper = rentalPropertyMapper;

export const rentalPropertyRepository: RentalPropertyRepository = {

    getAllRentalProperties: async () => {
        const data = await db.query.rentalProperties.findMany({
            with: {
                address: true
            }
        })

        return data.map(mapper.toDomain)
    },

    getRentalPropertyById: async (id: string) => {
        const data = await db.query.rentalProperties.findFirst({
            where: (rentalProperties, { eq }) => eq(rentalProperties.id, id),
            with: {
                address: true
            }
        })

        if (!data) throw new Error('Rental property not found');

        return mapper.toDomain(data)
    },  
}
