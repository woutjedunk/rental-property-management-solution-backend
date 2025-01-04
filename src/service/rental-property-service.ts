import { RentalProperty } from "@model/rentalProperty.ts";
import { rentalPropertyRepository } from "@repository/rental-property-repo.ts"
import { z } from "npm:zod"



export interface RentalPropertyRepository {
  getAllRentalProperties: () => Promise<RentalProperty[]>
  getRentalPropertyById: (id: string) => Promise<RentalProperty>
}


export const rentalPropertyService = {

  getAllRentalProperties: async () => {
    const rentalProperties = await rentalPropertyRepository.getAllRentalProperties();
    return rentalProperties;
  },

  getRentalPropertyById: async (id: string) => {

    z.string().uuid().parse(id);

    const rentalProperty = await rentalPropertyRepository.getRentalPropertyById(id);
    return rentalProperty;
  }
}

