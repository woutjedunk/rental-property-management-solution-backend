
export interface DbAdapter<DbEntity, DomainEntity> {
    mapToDb(domainEntity: DomainEntity): DbEntity;
    maptToDbList(domainEntities: DomainEntity[]): DbEntity[];
    mapToDomain(dbEntity: DbEntity): DomainEntity;
    mapToDomainList(dbEntities: DbEntity[]): DomainEntity[];
}