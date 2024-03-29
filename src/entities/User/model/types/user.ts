export interface User {
	firstName: string;
	lastName: string;
	login: string;
	avatarUrl?: string | null;
}

export interface UserResponse extends User {
	accessToken: string;
	type: string;
}

export interface UserSchema {
	authData?: User;
}
