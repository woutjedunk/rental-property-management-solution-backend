import { describe, it } from "@std/testing/bdd";
import { assertEquals, assertThrows } from "@std/assert";
import { addressMapper } from "@mapper/address-mapper.ts";
import { Address } from "@model/address.ts";
import { randomUUID } from "node:crypto";

describe("Address Mapper", () => {
    const sampleAddressDbModel = {
        id: randomUUID(),
        country: "country",
        city: "city",
        postalCode: "postalCode",
        street: "street",
        streetNumber: "streetNumber",
    };

    const sampleAddress = Address.from(
        sampleAddressDbModel.id,
        sampleAddressDbModel.country,
        sampleAddressDbModel.city,
        sampleAddressDbModel.postalCode,
        sampleAddressDbModel.street,
        sampleAddressDbModel.streetNumber
    );

    it("should map from persistence model to domain model", () => {
        const address = addressMapper.toDomain(sampleAddressDbModel);
        assertEquals(address.id, sampleAddressDbModel.id);
        assertEquals(address.country, sampleAddressDbModel.country);
        assertEquals(address.city, sampleAddressDbModel.city);
        assertEquals(address.postalCode, sampleAddressDbModel.postalCode);
        assertEquals(address.street, sampleAddressDbModel.street);
        assertEquals(address.streetNumber, sampleAddressDbModel.streetNumber);
    });

    it("should map from domain model to persistence model", () => {
        const addressDbModel = addressMapper.toPersistence(sampleAddress);
        assertEquals(addressDbModel.id, sampleAddress.id);
        assertEquals(addressDbModel.country, sampleAddress.country);
        assertEquals(addressDbModel.city, sampleAddress.city);
        assertEquals(addressDbModel.postalCode, sampleAddress.postalCode);
        assertEquals(addressDbModel.street, sampleAddress.street);
        assertEquals(addressDbModel.streetNumber, sampleAddress.streetNumber);
    });

    it("should throw an error if invalid data is provided to toDomain", () => {
        assertThrows(() => {
            addressMapper.toDomain({
                ...sampleAddressDbModel,
                country: 123 as unknown as string,
            });
        });
    });

});