import { DbAdapter } from "@persistence/DbAdapter.ts";
import { RentalProperty } from "@model/rentalProperty.ts";
import { RentalProperty as RentalPropertyPrisma} from "@prisma/client"
import { Address } from "@model/address.ts";
import { UUID } from "node:crypto";

export class RentalPropertyAdapter implements DbAdapter<RentalProperty, RentalPropertyPrisma> {
    toDomain(entity: RentalPropertyPrisma): RentalProperty {
      return RentalProperty.from(
        entity.id as UUID,
        Address.from(
            entity.country,
            entity.city,
            entity.zipcode,
            entity.street,
            entity.houseNumber,
            entity.busNumber
        ),
        entity.rentalOwner,
        entity.createdAt,
        entity.createdBy,
        entity.updatedAt,
        entity.updatedBy,
        entity.rentalName,
        entity.singleBeds,
        entity.doubleBeds,
        entity.storage
      )
    }

    toEntity(domain: RentalProperty): RentalPropertyPrisma {
        return {
            id: domain.id,
            country: domain.address!.country,
            city: domain.address!.city,
            zipcode: domain.address!.zipcode,
            street: domain.address!.street,
            houseNumber: domain.address!.houseNumber,
            busNumber: domain.address!.busNumber,
            rentalOwner: domain.rentalOwner,
            createdAt: domain.createdAt,
            createdBy: domain.createdBy,
            updatedAt: domain.updatedAt,
            updatedBy: domain.updatedBy,
            rentalName: domain.rentalName,
            singleBeds: domain.singleBeds,
            doubleBeds: domain.doubleBeds,
            storage: domain.storage
        }
    }
} 