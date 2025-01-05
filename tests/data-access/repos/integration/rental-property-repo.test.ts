import { RentalProperty } from "@model/rentalProperty.ts";
import { Address } from "@model/address.ts";
import { rentalPropertyRepository } from "@repository/rental-property-repo.ts";
import { assertEquals } from "@std/assert/equals";
import { assertRejects } from "@std/assert";
import { randomUUID } from "node:crypto";


const dummyData: RentalProperty[] = [
    RentalProperty.from(
        undefined,
        Address.from(undefined, 'Country1', 'City1', 'PostalCode1', 'Street1', 'StreetNumber1'),
        'Owner1',
        new Date(),
        'MadeBy1',
        new Date(),
        'EditedBy1',
        'RentalName1',
        1,
        2,
        'Storage1'
    ),
    RentalProperty.from(
        undefined,
        Address.from(undefined, 'Country2', 'City2', 'PostalCode2', 'Street2', 'StreetNumber2'),
        'Owner2',
        new Date(),
        'MadeBy2',
        new Date(),
        'EditedBy2',
        'RentalName2',
        3,
        4,
        'Storage2'
    )
];

Deno.test("insert new RentalProperties", async () => {
    for (const rentalProperty of dummyData) {
        await rentalPropertyRepository.save(rentalProperty);
    }

    const allRentalProperties = await rentalPropertyRepository.getAll();
    assertEquals(allRentalProperties.length, dummyData.length);
});

Deno.test("get all RentalProperties", async () => {
    const allRentalProperties = await rentalPropertyRepository.getAll();
    assertEquals(allRentalProperties.length, dummyData.length);
    for (let i = 0; i < dummyData.length; i++) {
        assertEquals(allRentalProperties[i].rentalName, dummyData[i].rentalName);
    }
});

Deno.test("get RentalProperty by ID", async () => {
    const allRentalProperties = await rentalPropertyRepository.getAll();
    const rentalProperty = allRentalProperties[0];
    const fetchedRentalProperty = await rentalPropertyRepository.getById(rentalProperty.id!);
    assertEquals(fetchedRentalProperty.rentalName, rentalProperty.rentalName);
});

Deno.test("get RentalProperty by non-existent ID", async () => {
    await assertRejects(
        async () => {
            await rentalPropertyRepository.getById(randomUUID());
        },
        Error,
        "Rental property not found"
    );
});




