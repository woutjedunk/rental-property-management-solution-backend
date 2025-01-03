import { InferSelectModel } from "drizzle-orm/table";
import { AddressEntity } from "./addressEntity.ts";
import { rentalProperties } from "@config/drizzle/schema.ts";

type RentalPropertyDrizzle = InferSelectModel<typeof rentalProperties>;

export type RentalPropertyEntity = Omit<RentalPropertyDrizzle, "addressId"> 
    & {
        address?: AddressEntity 
    };


