import { GrpcMetadataField } from '../enums/grpc-metadata-field.enum';
import { Permission } from '../enums/permission.enum';
import { Role } from '../enums/role.enum';
import { Claims } from '../types/claims.type';
import { Metadata } from '@grpc/grpc-js';

export const createMetadata = (from: Partial<Claims>): Metadata => {
	const metadata = new Metadata();
	from.roles?.forEach(role => metadata.add(GrpcMetadataField.ROLES, role));
	from.permissions?.forEach(permission => metadata.add(GrpcMetadataField.PERMISSIONS, permission));
	if (from.sub) metadata.add(GrpcMetadataField.UID, from.sub);
	return metadata;
};

export const convertMetadata = (metadata: Metadata): Partial<Claims> => {
	return {
		roles: metadata.get(GrpcMetadataField.ROLES) as Role[],
		permissions: metadata.get(GrpcMetadataField.PERMISSIONS) as Permission[],
		sub: metadata.get(GrpcMetadataField.UID)[0] as string,
	};
};
