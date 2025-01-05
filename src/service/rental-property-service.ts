import { RentalProperty } from "@model/rentalProperty.ts";
import { rentalPropertyRepository } from "@repository/rental-property-repo.ts"
import { UUID } from "node:crypto";
import { z } from "npm:zod"
import { RentalPropertyReqDTO, RentalPropertyResDTO } from "@controller/rental-property-controller.ts";
import { Address } from "@model/address.ts";



export interface RentalPropertyRepository {
  save: (rentalProperty: RentalProperty) => Promise<void>
  getAll: () => Promise<RentalProperty[]>
  getById: (id: UUID) => Promise<RentalProperty>
}


export const rentalPropertyService = {

  createRentalProperty: async (rentalPropertyData: RentalPropertyReqDTO): Promise<void> => {
    const rentalProperty = rentalPropertyMapper.fromReqDTO(rentalPropertyData);
    await rentalPropertyRepository.save(rentalProperty)
  },

  getAllRentalProperties: async (): Promise<RentalPropertyResDTO[]> => {

    const rentalProperties = await rentalPropertyRepository.getAll();
    const rentalPropertiesDTO = rentalProperties.map(rentalPropertyMapper.toResDTO);

    return rentalPropertiesDTO;
  },

  getRentalPropertyById: async (id: string): Promise<RentalPropertyResDTO> => {

    z.string().uuid().parse(id);

    const rentalProperty = await rentalPropertyRepository.getById(id as UUID);
    const rentalPropertyDTO = rentalPropertyMapper.toResDTO(rentalProperty); 

    return rentalPropertyDTO;
  }
}






const rentalPropertyMapper = {
  toResDTO: (rentalProperty: RentalProperty): RentalPropertyResDTO => {
    return {
      addressId: rentalProperty.address?.id?.toString(),
      rentalOwner: rentalProperty.rentalOwner,
      rentalName: rentalProperty.rentalName,
      singleBeds: rentalProperty.singleBeds,
      doubleBeds: rentalProperty.doubleBeds,
      storage: rentalProperty.storage,
      country: rentalProperty.address?.country,
      city: rentalProperty.address?.city,
      postalCode: rentalProperty.address?.postalCode,
      street: rentalProperty.address?.street,
      streetNumber: rentalProperty.address?.streetNumber,
    };
  },

  fromReqDTO: (dto: RentalPropertyReqDTO): RentalProperty => {
    const address = Address.from(
      undefined,
      dto.country!,
      dto.city!,
      dto.postalCode!,
      dto.street!,
      dto.streetNumber!
    );

    return RentalProperty.from(
      undefined,
      address,
      dto.rentalOwner!,
      undefined,
      undefined,
      undefined,
      undefined,
      dto.rentalName!,
      dto.singleBeds!,
      dto.doubleBeds!,
      dto.storage!
    );
  }
};


