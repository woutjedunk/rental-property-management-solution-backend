import { container } from "tsyringe";
import { RentalPropertyAdapter } from "@persistence/adapters/rentalProperty.adapter.ts";
import { IRentalPropertyPersistence } from "@application/rentalProperty/IRentalPropertyPersistence.ts";
import { DbAdapter } from "@persistence/DbAdapter.ts";
import { RentalProperty } from "@model/rentalProperty.ts";
import { RentalProperty as RentalPropertyPrisma } from "@prisma/client";
import { RentalPropertyGateway } from "@persistence/rentalPropertyGateway.ts";

// Register the RentalPropertyAdapter
container.register<DbAdapter<RentalProperty, RentalPropertyPrisma>>("RentalPropertyAdapter", {
  useClass: RentalPropertyAdapter,
});

// Register the RentalPropertyPersistenceImpl
container.register<IRentalPropertyPersistence>("IRentalPropertyPersistence", {
  useClass: RentalPropertyGateway,
});