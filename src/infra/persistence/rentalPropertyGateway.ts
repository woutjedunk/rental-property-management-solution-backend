import { IRentalPropertyPersistence } from "../../application/rentalProperty/IRentalPropertyPersistence.ts";
import { RentalProperty } from "@model/rentalProperty.ts";
import { PrismaClient, RentalProperty as RentalPropertyPrisma } from "@prisma/client"
import { DbAdapter } from "./DbAdapter.ts";
import { inject, singleton } from "tsyringe";

@singleton()
export class RentalPropertyGateway implements IRentalPropertyPersistence {

    private readonly rentalPropertyAdapter: DbAdapter<RentalProperty, RentalPropertyPrisma>;
    private readonly prisma: PrismaClient;


    constructor(
        @inject("rentalPropertyAdapter") rentalPropertyAdapter: DbAdapter<RentalProperty, RentalPropertyPrisma>, 
        @inject("prismaClient") prisma: PrismaClient
    ) {
        this.rentalPropertyAdapter = rentalPropertyAdapter;
        this.prisma = prisma;
    }

    async save(rentalProperty: RentalProperty): Promise<RentalProperty> {
        const rentalPropertyEntity = this.rentalPropertyAdapter.toEntity(rentalProperty)

        const result = await this.prisma.rentalProperty.create({ data: rentalPropertyEntity })

        return this.rentalPropertyAdapter.toDomain(result)
    }

    async getByRentalPropertyId(id: string): Promise<RentalProperty | undefined> {
        const rentalProperty = await this.prisma
            .rentalProperty.findUnique({ where: { id }})

        if (!rentalProperty) return undefined;

        return this.rentalPropertyAdapter.toDomain(rentalProperty);
    }

    async getAll(): Promise<RentalProperty[]> {
        const rentalPropertyEntities = await this.prisma
            .rentalProperty.findMany()

        return rentalPropertyEntities.map(this.rentalPropertyAdapter.toDomain)
    }

}