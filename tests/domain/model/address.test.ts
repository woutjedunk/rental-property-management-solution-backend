
import {
    describe,
    it,
} from "@std/testing/bdd";

import {
    assert,
    assertEquals,
    assertThrows
} from "@std/assert"


import { Address, AddressJSON } from "@model/address.ts";

describe("A valid address", () => {
    it("should be created", () => {
        const address = new Address("country", "city", "postalCode", "street", "streetNumber");
        assert(address instanceof Address);
        assertEquals(address.country, "country");
        assertEquals(address.city, "city");
        assertEquals(address.postalCode, "postalCode");
        assertEquals(address.street, "street");
        assertEquals(address.streetNumber, "streetNumber");
    });

    
    it("should be created from JSON with lowercase values", () => {
        const address = Address.from({
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
            Address.from({ } as unknown as AddressJSON);
        });
    });


    it("should throw an error if country is too long", () => {
        assertThrows(() => {
            Address.from({
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
                country: 123,
                city: "city",
                postalCode: "postalCode",
                street: "street",
                streetNumber: "streetNumber"
            } as unknown as AddressJSON);
        });
    })
});