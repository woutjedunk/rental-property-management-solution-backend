
export interface DbAdapter<DbEntity, DomainEntity> {
    maptToDb(domainEntity: DomainEntity): DbEntity;
    mapToDomain(dbEntity: DbEntity): DomainEntity;
}