export interface IDomainMapper<TPersistence, TDomain> {
	toDomain(from: TPersistence): TDomain;
	toOrm?(from: TDomain): TPersistence;
}
