import db from "@config/drizzle/db.ts"
import { RentalPropertyRepository } from "@service/rental-property-service.ts"
import { rentalPropertyMapper } from "../mappers/rental-property-mapper.ts"
import { addressMapper } from "@mapper/address-mapper.ts"
import { addresses, rentalProperties } from "@config/drizzle/schema.ts";
import { RentalProperty } from "@model/rentalProperty.ts";
import { UUID } from "node:crypto";

import { ResourceNotFoundError } from "../resource-not-found-error.ts";
import { HttpException, HTTP_RESPONSE_CODE, APP_ERROR_MESSAGE } from "../../exceptions/http-exception.ts";


export const rentalPropertyRepository: RentalPropertyRepository = {

    save: async (RentalProperty: RentalProperty) => {
        const rentalPropertyDb = rentalPropertyMapper.toPersistence(RentalProperty)
        const addressDb = addressMapper.toPersistence(RentalProperty.address!)

        try {
            await db.transaction(async (trx) => {
            const addressId = await trx
                .insert(addresses)
                .values(addressDb)
                .returning({
                insertedId: addresses.id
                })

            await trx
                .insert(rentalProperties)
                .values({
                ...rentalPropertyDb,
                addressId: addressId[0].insertedId
                })
            });
        } catch (error) {
            throw new HttpException(HTTP_RESPONSE_CODE.SERVER_ERROR, APP_ERROR_MESSAGE.serverError, error);
        }
    },

    getAll: async () => {
        let data;
        try {
            data = await db.query.rentalProperties.findMany({
            with: {
                address: true
            }
            });
        } catch (error) {
            throw new HttpException(HTTP_RESPONSE_CODE.SERVER_ERROR, APP_ERROR_MESSAGE.serverError, error);
        }

        return data.map(rentalPropertyMapper.toDomain)
    },

    getById: async (id: UUID) => {
        
        let data
        try {

            data = await db.query.rentalProperties.findFirst({
                where: (rentalProperties, { eq }) => eq(rentalProperties.id, id),
                with: {
                    address: true
                }
            })
        } catch (error) {
            throw new HttpException(HTTP_RESPONSE_CODE.SERVER_ERROR, APP_ERROR_MESSAGE.serverError, error);
        }

        if (!data) throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND, APP_ERROR_MESSAGE.rentalPropertyNotFound);

        return rentalPropertyMapper.toDomain(data)
    },  
}
