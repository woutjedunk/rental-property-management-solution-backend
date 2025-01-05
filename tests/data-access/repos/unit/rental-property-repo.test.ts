import { assertEquals, assertRejects, assertThrows,  } from "@std/assert";
import { stub, spy, assertSpyCalls } from "@std/testing/mock";
import { rentalPropertyRepository } from "@repository/rental-property-repo.ts";
import { rentalPropertyMapper } from "@mapper/rental-property-mapper.ts";
import db from "@config/drizzle/db.ts"; 
import { randomUUID } from "node:crypto";




const mockData = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    rentalOwner: "owner1",
    madeAt: "2023-01-01",
    madeBy: "user1",
    editedAt: "2023-01-02",
    editedBy: "user2",
    rentalName: "Rental 1",
    singleBeds: 2,
    doubleBeds: 2,
    storage: "no",
    addressId: "123e4567-e89b-12d3-a456-426614174001",
    address: {
      id: "123e4567-e89b-12d3-a456-426614174001",
      street: "456 Maple Ave",
      city: "Othertown",
      country: "CountryB",
      postalCode: "12345",
      streetNumber: "456",
    },
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174002",
    rentalOwner: "owner2",
    madeAt: "2023-02-01",
    madeBy: "user3",
    editedAt: "2023-02-02",
    editedBy: "user4",
    rentalName: "Rental 2",
    singleBeds: 1,
    doubleBeds: 3,
    storage: "yes",
    addressId: "123e4567-e89b-12d3-a456-426614174003",
    address: {
      id: "123e4567-e89b-12d3-a456-426614174003",
      street: "789 Oak St",
      city: "Anothertown",
      country: "CountryC",
      postalCode: "67890",
      streetNumber: "789",
    },
  },
];

Deno.test("getAllRentalProperties returns mapped domain objects", async () => {
    // Spy on the mapper to check if it’s being called
    const mapperSpy = spy(rentalPropertyMapper, "toDomain");
  
    const dbStub = stub(
      db.query.rentalProperties,
      "findMany",
      () => mockData as any
    );
  
    try {
      const result = await rentalPropertyRepository.getAllRentalProperties();
  
      // Assert the result length
      assertEquals(result.length, 2);
      assertEquals(mapperSpy.calls.length, 2);
    } finally {
      dbStub.restore();
      mapperSpy.restore(); // Restore the spy
    }
  })

Deno.test("getRentalPropertyById returns mapped domain object", async () => {
    // Stub for findFirst method
    const someId = "123e4567-e89b-12d3-a456-426614174000";
    const dbStub = stub(
      db.query.rentalProperties,
      "findFirst",
      () => mockData.find((item) => item.id === someId) as any
    );
  
    try {
      const result = await rentalPropertyRepository.getRentalPropertyById(someId);
  
      // Assert the result data
      assertEquals(result.id, "123e4567-e89b-12d3-a456-426614174000");
    } finally {
      dbStub.restore(); // Ensure the stub is restored after the test
    }
  });
  
  Deno.test("getRentalPropertyById throws error if not found", async () => {
    // Stub for findFirst method to return null
    const dbStub = stub(
      db.query.rentalProperties,
      "findFirst",
      () => null as any
    );
  
    try {
      await assertRejects(
        () => rentalPropertyRepository.getRentalPropertyById(randomUUID()),
        Error,
        "Rental property not found"
      );
    } finally {
      dbStub.restore(); // Ensure the stub is restored after the test
    }
  });
  
