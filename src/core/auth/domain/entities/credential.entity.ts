import { LoginType } from '@core/auth/enums/login-type.enum';
import bcrypt from 'bcrypt';

import { IEntity } from '@common/abstract/entity/entity.interface';

export class Credential implements IEntity<Credential> {
	static newId() {
		return crypto.randomUUID();
	}

	public readonly id: string;

	private _isSecretHashed: boolean;
	private _secretHash!: string | null;

	constructor(
		public identifier: string,
		public loginType: LoginType,
		public identityId: string,
		constructorOptions?: {
			id?: string;
			isSecretHashed?: boolean;
			secretHash?: string | null;
		},
	) {
		this.id = constructorOptions?.id ?? Credential.newId();
		this._isSecretHashed = constructorOptions?.isSecretHashed ?? false;
		this._secretHash = constructorOptions?.secretHash ?? null;
	}

	public get secretHash() {
		return this._secretHash;
	}

	public set secretHash(inp: string | null) {
		this._isSecretHashed = false;
		this._secretHash = inp;
	}

	public hashSecret() {
		if (this._secretHash === null) {
			throw Error('Attempted to hash null value');
		}
		if (this._isSecretHashed) {
			console.warn('Attempted to hash already hashed secret');
			return;
		}
		this._secretHash = bcrypt.hashSync(this._secretHash, 10);
		this._isSecretHashed = true;
		return this;
	}

	public compareHash(secret: string) {
		if (this._secretHash === null) {
			throw Error('Attempted to compare null value');
		}
		if (!this._isSecretHashed) {
			throw Error('Attempted to compare unhashed secret');
		}
		return bcrypt.compareSync(secret, this._secretHash);
	}

	public equals(entity: Credential): boolean {
		return this.id === entity?.id;
	}
}
