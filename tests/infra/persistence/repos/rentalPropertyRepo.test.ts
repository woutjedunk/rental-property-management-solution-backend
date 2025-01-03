import { assert, assertEquals } from "@std/assert";
import { RentalPropertyRepo } from "@persistence/repos/rentalPropertyRepo.ts";
import { RentalPropertyEntity } from "@persistence/dbEntities/rentalPropertyEntity.ts";
import { randomUUID } from "node:crypto";
import db from "@config/drizzle/db.ts";


Deno.test("RentalPropertyRepo.save should insert a rental property", async () => {
    const repo = new RentalPropertyRepo();
    const rentalPropertyEntity: RentalPropertyEntity = {
        id: randomUUID(),
        rentalOwner: "owner",
        madeAt: new Date().toISOString(),
        madeBy: "creator",
        editedAt: new Date().toISOString(),
        editedBy: "editor",
        rentalName: "rental",
        singleBeds: "1",
        doubleBeds: "2",
        storage: "storage",
        address: {
            id: randomUUID(),
            country: "country",
            city: "city",
            postalCode: "postalCode",
            street: "street",
            streetNumber: "number"
        }
    };

    await repo.save(rentalPropertyEntity);

    const savedEntity = await repo.getByRentalPropertyId(rentalPropertyEntity.id);
    assert(savedEntity);
    assertEquals(savedEntity!.rentalOwner, rentalPropertyEntity.rentalOwner);
});

Deno.test("RentalPropertyRepo.getByRentalPropertyId should return undefined for non-existent id", async () => {
    const repo = new RentalPropertyRepo();
    const result = await repo.getByRentalPropertyId(randomUUID());
    assertEquals(result, undefined);
});

Deno.test("RentalPropertyRepo.getAll should return all rental properties", async () => {
    const repo = new RentalPropertyRepo();
    const rentalPropertyEntity: RentalPropertyEntity = {
        id: randomUUID(),
        rentalOwner: "owner",
        madeAt: new Date().toISOString(),
        madeBy: "creator",
        editedAt: new Date().toISOString(),
        editedBy: "editor",
        rentalName: "rental",
        singleBeds: "1",
        doubleBeds: "2",
        storage: "storage",
        address: {
            id: randomUUID(),
            country: "country",
            city: "city",
            postalCode: "postalCode",
            street: "street",
            streetNumber: "number"
        }
    };

    await repo.save(rentalPropertyEntity);

    const allEntities = await repo.getAll();
    assert(allEntities.length > 0);
});
