import { LoginType } from '@core/auth/enums/login-type.enum';
import bcrypt from 'bcrypt';

import { IEntity } from '@common/abstract/entity/entity.interface';

export class Credential implements IEntity<Credential> {
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
		this.id = constructorOptions?.id || crypto.randomUUID();
		this._isSecretHashed = constructorOptions?.isSecretHashed || false;
	}

	public get secretHash() {
		return this._secretHash;
	}

	public set secretHash(inp: string | null) {
		this._isSecretHashed = false;
		this._secretHash = inp;
	}

	public hashSecret() {
		// check if secret is null
		if (this._secretHash === null) {
			throw Error('Attempted to hash null value');
		}

		// check if already hashed
		if (this._isSecretHashed) {
			console.warn('Attempted to hash already hashed secret');
			return;
		}

		// hash
		this._secretHash = bcrypt.hashSync(this._secretHash, 10);
		this._isSecretHashed = true;
		return this;
	}

	public validate(): boolean {
		return true;
	}

	public equals(entity: Credential): boolean {
		return this.id === entity?.id;
	}
}
