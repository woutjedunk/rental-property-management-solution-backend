import { describe, it } from "@std/testing/bdd";
import { assert, assertEquals, assertThrows } from "@std/assert";
import { RentalProperty } from "@model/rentalProperty.ts";
import { randomUUID } from "node:crypto";
import { Address } from "@model/address.ts";

const someValidAddress = Address.from(
    randomUUID(),
    "country",
    "city",
    "postalCode",
    "street",
    "streetNumber"
);

describe("A valid rental property", () => {
    it("should be created", () => {
        const rentalProperty = RentalProperty.from(
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
        assert(rentalProperty instanceof RentalProperty);
        assertEquals(rentalProperty.address.country, "country");
        assertEquals(rentalProperty.address.city, "city");
        assertEquals(rentalProperty.address.postalCode, "postalCode");
        assertEquals(rentalProperty.address.street, "street");
        assertEquals(rentalProperty.address.streetNumber, "streetNumber");
        assertEquals(rentalProperty.rentalOwner, "rentalOwner");
        assertEquals(rentalProperty.madeBy, "madeBy");
        assertEquals(rentalProperty.editedBy, "editedBy");
        assertEquals(rentalProperty.rentalName, "rentalName");
        assertEquals(rentalProperty.singleBeds, 1);
        assertEquals(rentalProperty.doubleBeds, 2);
        assertEquals(rentalProperty.storage, "storage");
    });

    it("should throw an error for invalid rentalOwner", () => {
        assertThrows(() => {
            RentalProperty.from(
                randomUUID(),
                someValidAddress,
                123 as any,
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
    });

    it("should throw an error for invalid madeBy", () => {
        assertThrows(() => {
            RentalProperty.from(
                randomUUID(),
                someValidAddress,
                "rentalOwner",
                new Date(),
                123 as any,
                new Date(),
                "editedBy",
                "rentalName",
                1,
                2,
                "storage"
            );
        });
    });

    it("should throw an error for invalid editedBy", () => {
        assertThrows(() => {
            RentalProperty.from(
                randomUUID(),
                someValidAddress,
                "rentalOwner",
                new Date(),
                "madeBy",
                new Date(),
                123 as any,
                "rentalName",
                1,
                2,
                "storage"
            );
        });
    });

    it("should throw an error for invalid singleBeds", () => {
        assertThrows(() => {
            RentalProperty.from(
                randomUUID(),
                someValidAddress,
                "rentalOwner",
                new Date(),
                "madeBy",
                new Date(),
                "editedBy",
                "rentalName",
                "one" as any,
                2,
                "storage"
            );
        });
    });

    it("should throw an error for invalid doubleBeds", () => {
        assertThrows(() => {
            RentalProperty.from(
                randomUUID(),
                someValidAddress,
                "rentalOwner",
                new Date(),
                "madeBy",
                new Date(),
                "editedBy",
                "rentalName",
                1,
                "two" as any,
                "storage"
            );
        });
    });

    it("should throw an error for invalid storage", () => {
        assertThrows(() => {
            RentalProperty.from(
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
                123 as any
            );
        });
    });
});