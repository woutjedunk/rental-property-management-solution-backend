import { InferSelectModel } from "drizzle-orm/table";
import { addresses } from "@config/drizzle/schema.ts";

type AddressDrizzle = InferSelectModel<typeof addresses>;

export type AddressEntity = AddressDrizzle