import { RentalProperty } from "@model/rentalProperty.ts";
import { rentalPropertyRepository } from "@repository/rental-property-repo.ts"
import { UUID } from "node:crypto";
import { z } from "npm:zod"



export interface RentalPropertyRepository {
  saveRentalProperty: (rentalProperty: RentalProperty) => Promise<void>
  getAllRentalProperties: () => Promise<RentalProperty[]>
  getRentalPropertyById: (id: UUID) => Promise<RentalProperty>
}


export const rentalPropertyService = {

  getAllRentalProperties: async () => {
    const rentalProperties = await rentalPropertyRepository.getAllRentalProperties();
    return rentalProperties;
  },

  getRentalPropertyById: async (id: string) => {

    z.string().uuid().parse(id);

    const rentalProperty = await rentalPropertyRepository.getRentalPropertyById(id as UUID);
    return rentalProperty;
  }
}

