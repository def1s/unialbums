export interface User {
	username: string;
	avatar?: string;
}

export interface UserSchema {
	authData?: User;

	_inited: boolean;
}
