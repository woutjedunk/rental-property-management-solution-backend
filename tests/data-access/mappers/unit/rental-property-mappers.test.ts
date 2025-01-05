import { describe, it } from "@std/testing/bdd";
import { assertEquals, assertThrows } from "@std/assert";
import { rentalPropertyMapper } from "@mapper/rental-property-mapper.ts";
import { RentalProperty } from "@model/rentalProperty.ts";
import { Address } from "@model/address.ts";
import { randomUUID } from "node:crypto";
import { stub } from "@std/testing/mock";
import { addressMapper } from "@mapper/address-mapper.ts";

describe("Rental Property Mapper", () => {
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

    const sampleRentalPropertyDbModel = {
        id: randomUUID(),
        addressId: sampleAddressDbModel.id,
        rentalOwner: "rentalOwner",
        madeAt: new Date(),
        madeBy: "madeBy",
        editedAt: new Date(),
        editedBy: "editedBy",
        rentalName: "rentalName",
        singleBeds: "1",
        doubleBeds: "2",
        storage: "storage",
        address: sampleAddressDbModel,
    };

    const sampleRentalPropertyDbModelWithoutAddress = {
        id: randomUUID(),
        addressId: sampleAddressDbModel.id,
        rentalOwner: "rentalOwner",
        madeAt: new Date(),
        madeBy: "madeBy",
        editedAt: new Date(),
        editedBy: "editedBy",
        rentalName: "rentalName",
        singleBeds: "1",
        doubleBeds: "2",
        storage: "storage",
    }

    const sampleRentalProperty = RentalProperty.from(
        sampleRentalPropertyDbModel.id,
        sampleAddress,
        sampleRentalPropertyDbModel.rentalOwner,
        new Date(sampleRentalPropertyDbModel.madeAt),
        sampleRentalPropertyDbModel.madeBy,
        new Date(sampleRentalPropertyDbModel.editedAt),
        sampleRentalPropertyDbModel.editedBy,
        sampleRentalPropertyDbModel.rentalName,
        parseInt(sampleRentalPropertyDbModel.singleBeds),
        parseInt(sampleRentalPropertyDbModel.doubleBeds),
        sampleRentalPropertyDbModel.storage
    );

    it("should map from persistence model to domain model", () => {
        const addressMapperStub = stub(addressMapper, "toDomain", () => sampleAddress);

        const rentalProperty = rentalPropertyMapper.toDomain(sampleRentalPropertyDbModel);
        assertEquals(rentalProperty.id, sampleRentalPropertyDbModel.id);
        assertEquals(rentalProperty.address!.id, sampleRentalPropertyDbModel.address!.id);
        assertEquals(rentalProperty.rentalOwner, sampleRentalPropertyDbModel.rentalOwner);
        assertEquals(rentalProperty.madeAt, sampleRentalPropertyDbModel.madeAt);
        assertEquals(rentalProperty.madeBy, sampleRentalPropertyDbModel.madeBy);
        assertEquals(rentalProperty.editedAt, sampleRentalPropertyDbModel.editedAt);
        assertEquals(rentalProperty.editedBy, sampleRentalPropertyDbModel.editedBy);
        assertEquals(rentalProperty.rentalName, sampleRentalPropertyDbModel.rentalName);
        assertEquals(rentalProperty.singleBeds, parseInt(sampleRentalPropertyDbModel.singleBeds));
        assertEquals(rentalProperty.doubleBeds, parseInt(sampleRentalPropertyDbModel.doubleBeds));
        assertEquals(rentalProperty.storage, sampleRentalPropertyDbModel.storage);

        addressMapperStub.restore();
    });

    it("should map from persistence model to domain model, even if no address is given", () => {

        const addressMapperStub = stub(addressMapper, "toDomain", () => sampleAddress);

        const rentalProperty = rentalPropertyMapper.toDomain(sampleRentalPropertyDbModelWithoutAddress);

        // assertEquals(rentalProperty.id, sampleRentalPropertyDbModel.id);
        assertEquals(rentalProperty.address, undefined)
        assertEquals(rentalProperty.rentalOwner, sampleRentalPropertyDbModel.rentalOwner);
        assertEquals(rentalProperty.madeAt, sampleRentalPropertyDbModel.madeAt);
        assertEquals(rentalProperty.madeBy, sampleRentalPropertyDbModel.madeBy);
        assertEquals(rentalProperty.editedAt, sampleRentalPropertyDbModel.editedAt);
        assertEquals(rentalProperty.editedBy, sampleRentalPropertyDbModel.editedBy);
        assertEquals(rentalProperty.rentalName, sampleRentalPropertyDbModel.rentalName);
        assertEquals(rentalProperty.singleBeds, parseInt(sampleRentalPropertyDbModel.singleBeds));
        assertEquals(rentalProperty.doubleBeds, parseInt(sampleRentalPropertyDbModel.doubleBeds));
        assertEquals(rentalProperty.storage, sampleRentalPropertyDbModel.storage);

        addressMapperStub.restore();
    })

    it("should map from domain model to persistence model", () => {
        const rentalPropertyDbModel = rentalPropertyMapper.toPersistence(sampleRentalProperty);
        // assertEquals(rentalPropertyDbModel.id, sampleRentalProperty.id);
        assertEquals(rentalPropertyDbModel.addressId, sampleRentalProperty.address!.id);
        assertEquals(rentalPropertyDbModel.rentalOwner, sampleRentalProperty.rentalOwner);
        assertEquals(rentalPropertyDbModel.madeAt, sampleRentalProperty.madeAt);
        assertEquals(rentalPropertyDbModel.madeBy, sampleRentalProperty.madeBy);
        assertEquals(rentalPropertyDbModel.editedAt, sampleRentalProperty.editedAt);
        assertEquals(rentalPropertyDbModel.editedBy, sampleRentalProperty.editedBy);
        assertEquals(rentalPropertyDbModel.rentalName, sampleRentalProperty.rentalName);
        assertEquals(rentalPropertyDbModel.singleBeds, sampleRentalProperty.singleBeds.toString());
        assertEquals(rentalPropertyDbModel.doubleBeds, sampleRentalProperty.doubleBeds.toString());
        assertEquals(rentalPropertyDbModel.storage, sampleRentalProperty.storage);
    });



    it("should throw an error if invalid data is provided to toDomain", () => {
        assertThrows(() => {
            rentalPropertyMapper.toDomain({
                ...sampleRentalPropertyDbModel,
                rentalOwner: 123 as unknown as string,
            });
        });
    });
});