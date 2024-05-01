import { Profile } from 'entities/Profile';

export enum ValidateProfileError {
	INCORRECT_FIRSTNAME = 'INCORRECT_FIRSTNAME',
	INCORRECT_LASTNAME = 'INCORRECT_LASTNAME',
	INCORRECT_USERNAME = 'INCORRECT_USERNAME',
	NO_DATA = 'NO_DATA',
	SERVER_ERROR = 'SERVER_ERROR',
}

export interface EditableUserProfileSchema {
	data?: Profile;
	form?: Profile;
	isLoading: boolean;
	error?: string;
	readonly: boolean;
	serverMessage?: string;
	validateErrors?: ValidateProfileError[];
}
