import { describe, it, beforeEach } from "@std/testing/bdd";
import { assert, assertEquals } from "@std/assert";
import { RentalPropertyGateway } from "@persistence/rentalPropertyGateway.ts";
import { RentalProperty } from "@model/rentalProperty.ts";
import { randomUUID } from "node:crypto";
import { RentalPropertyAdapter } from "@persistence/adapters/rentalPropertyAdapter.ts";
import { RentalPropertyRepo } from "@persistence/repos/rentalPropertyRepo.ts";
import { Address } from "@model/address.ts";



describe("RentalPropertyGateway", () => {
    let gateway: RentalPropertyGateway;
    let rentalProperty: RentalProperty;

    beforeEach(() => {
        const adapter = RentalPropertyAdapter.getInstance();
        const repo = new RentalPropertyRepo();
        gateway = new RentalPropertyGateway(adapter, repo);

        const someValidAddress = Address.from(
            randomUUID(),
            "country",
            "city",
            "postalCode",
            "street",
            "streetNumber"
        );

        rentalProperty = RentalProperty.from(
            randomUUID(),
            someValidAddress,
            "rentalOwner",
            new Date(),
            "madeBy",
            new Date(),
            "editedBy",
            "rentalName",
            1,
            2,
            "storage"
        );
    });

    it("should save a rental property", async () => {
        await gateway.save(rentalProperty);
        const savedProperty = await gateway.getByRentalPropertyId(rentalProperty.id);
        assert(savedProperty instanceof RentalProperty);
        assertEquals(savedProperty!.rentalOwner, rentalProperty.rentalOwner);
    });

    it("should get a rental property by id", async () => {
        await gateway.save(rentalProperty);
        const fetchedProperty = await gateway.getByRentalPropertyId(rentalProperty.id);
        assert(fetchedProperty instanceof RentalProperty);
        assertEquals(fetchedProperty!.id, rentalProperty.id);
    });

    it("should return undefined for non-existent rental property id", async () => {
        const result = await gateway.getByRentalPropertyId(randomUUID());
        assertEquals(result, undefined);
    });

    it("should get all rental properties", async () => {
        await gateway.save(rentalProperty);
        const allProperties = await gateway.getAll();
        assert(allProperties.length > 0);
    });
});