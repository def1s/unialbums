import { Profile } from 'entities/Profile';

export interface ValidateProfileError {
	INCORRECT_FIRSTNAME?: boolean;
	INCORRECT_LASTNAME?: boolean;
	INCORRECT_USERNAME?: boolean;
	NO_DATA?: boolean;
	SERVER_ERROR?: boolean;
}

export interface EditableUserProfileSchema {
	data?: Profile;
	form?: Profile;
	isLoading: boolean;
	error?: string;
	readonly: boolean;
	serverMessage?: string;
	validateErrors?: ValidateProfileError;
}
