import {
    describe,
    it,
} from "@std/testing/bdd";

import {
    assert,
    assertEquals,
    assertThrows
} from "@std/assert"

import { Address } from "@model/address.ts";
import { randomUUID } from "node:crypto";

describe("A valid address", () => {
    it("should be created", () => {
        const address = Address.from(
            randomUUID(),
            "country",
            "city",
            "postalCode",
            "street",
            "streetNumber"
        );
        assert(address instanceof Address);
        assertEquals(address.country, "country");
        assertEquals(address.city, "city");
        assertEquals(address.postalCode, "postalCode");
        assertEquals(address.street, "street");
        assertEquals(address.streetNumber, "streetNumber");
    });

    it("should throw an error if JSON is empty", () => {
        assertThrows(() => {
            Address.from(
                randomUUID(),
                null as unknown as string,
                null as unknown as string,
                null as unknown as string,
                null as unknown as string,
                null as unknown as string
            );
        });
    });

    it("should throw an error if country is too long", () => {
        assertThrows(() => {
            Address.from(
                randomUUID(),
                "a".repeat(256),
                "city",
                "postalCode",
                "street",
                "streetNumber"
            );
        });
    });

    it("should throw an error if city is too long", () => {
        assertThrows(() => {
            Address.from(
                randomUUID(),
                "country",
                "a".repeat(256),
                "postalCode",
                "street",
                "streetNumber"
            );
        });
    });

    it("should throw an error if postalCode is too long", () => {
        assertThrows(() => {
            Address.from(
                randomUUID(),
                "country",
                "city",
                "a".repeat(256),
                "street",
                "streetNumber"
            );
        });
    });

    it("should throw an error if country name is a number", () => {
        assertThrows(() => {
            Address.from(
                randomUUID(),
                123 as unknown as string,
                "city",
                "postalCode",
                "street",
                "streetNumber"
            );
        });
    });
});