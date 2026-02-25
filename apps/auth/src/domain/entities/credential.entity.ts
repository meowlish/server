import { LoginType } from '../../enums/login-type.enum';
import { IEntity } from '@server/utils';
import bcrypt from 'bcrypt';

export class Credential implements IEntity<Credential> {
	public static newId(): string {
		return crypto.randomUUID();
	}

	public readonly id: string;
	public identifier: string;
	public loginType: LoginType;
	private _secretHash!: string | null;

	public constructor(constructorOptions: {
		id?: string;
		identifier: string;
		loginType: LoginType;
		secretHash?: string | null;
		isHashed?: boolean;
	}) {
		this.id = constructorOptions.id ?? Credential.newId();
		this.identifier = constructorOptions.identifier;
		this.loginType = constructorOptions.loginType;
		if (constructorOptions.isHashed) this._secretHash = constructorOptions.secretHash ?? null;
		else this.secretHash = constructorOptions.secretHash ?? null;
	}

	public get secretHash() {
		return this._secretHash;
	}

	public set secretHash(inp: string | null) {
		this._secretHash = inp ? bcrypt.hashSync(inp, 10) : inp;
	}

	public update(options: CredentialUpdatableProperties): void {
		if (options.identifier) this.identifier = options.identifier;
		if (options.secretHash) this.secretHash = options.secretHash;
	}
}

export type CredentialUpdatableProperties = Partial<Pick<Credential, 'identifier' | 'secretHash'>>;
