// mappers/rentalPropertyMapper.ts
import { RentalProperty } from "@model/rentalProperty.ts";
import { addressMapper } from "./address-mapper.ts";
import { rentalProperties, addresses} from "@config/drizzle/schema.ts";
import { UUID } from "node:crypto";

type RentalPropertyDbModel = typeof rentalProperties.$inferInsert;
type AddressDbModel = typeof addresses.$inferInsert;


export const rentalPropertyMapper = {
  toDomain: (
    row: RentalPropertyDbModel & { address?: AddressDbModel }
  ): RentalProperty => {
    const address = row.address ? addressMapper.toDomain(row.address) : undefined;

    return RentalProperty.from(
      row.id as UUID,
      address,
      row.rentalOwner,
      new Date(row.madeAt!),
      row.madeBy,
      new Date(row.editedAt!),
      row.editedBy,
      row.rentalName,
      parseInt(row.singleBeds),
      parseInt(row.doubleBeds),
      row.storage
    );
  },

  toPersistence: (property: RentalProperty): RentalPropertyDbModel => {
    return {
      id: property.id,
      addressId: property.address?.id as UUID || null,
      rentalOwner: property.rentalOwner,
      madeAt: property.madeAt,
      madeBy: property.madeBy,
      editedAt: property.editedAt,
      editedBy: property.editedBy,
      rentalName: property.rentalName,
      singleBeds: property.singleBeds.toString(),
      doubleBeds: property.doubleBeds.toString(),
      storage: property.storage,
    };
  },
};
