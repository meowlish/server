import { LoginType } from '../../enums/login-type.enum';
import { IEntity } from '@server/utils';
import bcrypt from 'bcrypt';

export class Credential implements IEntity<Credential> {
	static newId() {
		return crypto.randomUUID();
	}

	public readonly id: string;
	public identifier: string;
	public loginType: LoginType;
	public identityId: string;

	private _isSecretHashed: boolean;
	private _secretHash!: string | null;

	constructor(constructorOptions: {
		id?: string;
		identifier: string;
		loginType: LoginType;
		identityId: string;
		isSecretHashed?: boolean;
		secretHash?: string | null;
	}) {
		this.id = constructorOptions.id ?? Credential.newId();
		this.identifier = constructorOptions.identifier;
		this.loginType = constructorOptions.loginType;
		this.identityId = constructorOptions.identityId;
		this._isSecretHashed = constructorOptions.isSecretHashed ?? false;
		this._secretHash = constructorOptions.secretHash ?? null;
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
}
