import { InferSelectModel } from "drizzle-orm/table";
import { AddressEntity } from "./adderssDrizzle.ts";
import { rentalPropertiesTable } from "@config/drizzle/schema.ts";

type RentalPropertyDrizzle = InferSelectModel<typeof rentalPropertiesTable>;

export type RentalPropertyEntity = Omit<RentalPropertyDrizzle, "addressId"> 
    & {
        address?: AddressEntity 
    };


