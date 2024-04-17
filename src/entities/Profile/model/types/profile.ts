export interface Profile {
	firstName: string;
	lastName: string;
	username: string;
	avatar: string;
}

export interface ProfileSchema {
	data?: Profile;
	isLoading: boolean;
	error?: string;
	readonly: boolean;
}
