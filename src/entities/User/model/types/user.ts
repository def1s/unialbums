export interface User {
	firstName: string;
	username: string;
	avatarUrl: string | null;
}

export interface UserSchema {
	authData?: User;
}
