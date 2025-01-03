import { RentalProperty } from "@model/rentalProperty.ts"
import { RentalPropertyEntity } from "@persistence/dbEntities/rentalPropertyEntity.ts";
import { UUID } from "node:crypto";
import { AddressAdapter } from "@persistence/adapters/addressAdapter.ts";
import { DbAdapter } from "@persistence/DbAdapter.ts";

export class RentalPropertyAdapter implements DbAdapter<RentalPropertyEntity, RentalProperty> {

    private static instance: RentalPropertyAdapter;

    private constructor() {} 

    static getInstance(): RentalPropertyAdapter {
        if (!RentalPropertyAdapter.instance) {
            RentalPropertyAdapter.instance = new RentalPropertyAdapter();
        }
        return RentalPropertyAdapter.instance;
    }

    mapToDomain(row: RentalPropertyEntity): RentalProperty {
        return RentalProperty.from(
            row.id as UUID,
            row.address ? AddressAdapter.getInstance().mapToDomain(row.address) : undefined,
            row.rentalOwner || "",
            new Date(row.madeAt),
            row.madeBy,
            new Date(row.editedAt),
            row.editedBy,
            row.rentalName,
            Number(row.singleBeds),
            Number(row.doubleBeds),
            row.storage
        );
    }

    mapToDb(domain: RentalProperty): RentalPropertyEntity {
        return {
            id: domain.id,
            address: domain.address ? AddressAdapter.getInstance().mapToDb(domain.address) : undefined,
            rentalOwner: domain.rentalOwner,
            madeAt: domain.madeAt.toISOString(),
            madeBy: domain.madeBy,
            editedAt: domain.editedAt.toISOString(),
            editedBy: domain.editedBy,
            rentalName: domain.rentalName,
            singleBeds: domain.singleBeds.toString(),
            doubleBeds: domain.doubleBeds.toString(),
            storage: domain.storage
        }
    }

    maptToDbList(rows: RentalProperty[]): RentalPropertyEntity[] {
        return rows.map((row) => this.mapToDb(row));
    }

    mapToDomainList(dbEntities: RentalPropertyEntity[]): RentalProperty[] {
        return dbEntities.map((dbEntity) => this.mapToDomain(dbEntity));
    }
}