
export interface DbAdapter<DbEntity, DomainEntity> {
    mapToDb(domainEntity: DomainEntity): DbEntity;
    mapToDomain(dbEntity: DbEntity): DomainEntity;
}