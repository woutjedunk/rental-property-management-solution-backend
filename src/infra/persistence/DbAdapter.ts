

export interface DbAdapter<Domain, Entity> {
    toDomain(entity: Entity): Domain;
    toEntity(domain: Domain): Entity;
}