export interface UserJWTDecode {
	firstName: string;
	sub: string;
	avatar?: string;
	userId: number;
}

// делаю так, потому что удобнее и понятнее работать с полем username, а не sub
export interface User extends Omit<UserJWTDecode, 'sub'> {
	username: string;
}

export interface UserSchema {
	authData?: User;

	_inited: boolean;
}
