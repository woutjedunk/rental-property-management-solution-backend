import { InferSelectModel } from "drizzle-orm/table";
import { addressesTable } from "@config/drizzle/schema.ts";

type AddressDrizzle = InferSelectModel<typeof addressesTable>;

export type AddressEntity = AddressDrizzle