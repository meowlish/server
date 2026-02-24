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
	}) {
		this.id = constructorOptions.id ?? Credential.newId();
		this.identifier = constructorOptions.identifier;
		this.loginType = constructorOptions.loginType;
		this.secretHash = constructorOptions.secretHash ?? null;
	}

	public get secretHash() {
		return this._secretHash;
	}

	public set secretHash(inp: string | null) {
		this._secretHash = inp ? bcrypt.hashSync(inp, 10) : inp;
	}

	public update(options: { identifier?: string; secretHash?: string }): void {
		if (options.identifier) this.identifier = options.identifier;
		if (options.secretHash) this.secretHash = options.secretHash;
	}
}
