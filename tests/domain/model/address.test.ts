
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
        const address = new Address(randomUUID(), "country", "city", "postalCode", "street", "streetNumber");
        assert(address instanceof Address);
        assertEquals(address.country, "country");
        assertEquals(address.city, "city");
        assertEquals(address.postalCode, "postalCode");
        assertEquals(address.street, "street");
        assertEquals(address.streetNumber, "streetNumber");
    });

    
    it("should be created from JSON with lowercase values", () => {
        const address = Address.from({
            id: randomUUID(),
            country: "COUNTRY",
            city: "CITY",
            postalCode: "POSTALCODE",
            street: "STREET",
            streetNumber: "STREETNUMBER"
        });
        assert(address instanceof Address);
        assertEquals(address.country, "country");
        assertEquals(address.city, "city");
        assertEquals(address.postalCode, "postalcode");
        assertEquals(address.street, "street");
        assertEquals(address.streetNumber, "streetnumber");
    });

    it("should throw an error if JSON is empty", () => {
        assertThrows(() => {
            Address.from({ } as any);
        });
    });


    it("should throw an error if country is too long", () => {
        assertThrows(() => {
            Address.from({
                id: randomUUID(),
                country: "a".repeat(256),
                city: "city",
                postalCode: "postalCode",
                street: "street",
                streetNumber: "streetNumber"
            });
        });
    })

    it("should throw an error if city is too long", () => {
        assertThrows(() => {
            Address.from({
                id: randomUUID(),
                country: "country",
                city: "a".repeat(256),
                postalCode: "postalCode",
                street: "street",
                streetNumber: "streetNumber"
            });
        });
    })

    it("should throw an error if postalCode is too long", () => {
        assertThrows(() => {
            Address.from({
                id: randomUUID(),
                country: "country",
                city: "city",
                postalCode: "a".repeat(256),
                street: "street",
                streetNumber: "streetNumber"
            });
        });
    })

    it("should throw an error if country name is a number", () => {
        assertThrows(() => {
            Address.from({
                id: randomUUID(),
                country: 123,
                city: "city",
                postalCode: "postalCode",
                street: "street",
                streetNumber: "streetNumber"
            } as any);
        });
    })
});