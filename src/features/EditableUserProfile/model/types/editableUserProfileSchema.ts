import { Profile, ValidateProfileError } from 'entities/Profile';

export interface EditableUserProfileSchema {
	data?: Profile;
	form?: Profile;
	isLoading: boolean;
	error?: string;
	readonly: boolean;
	serverMessage?: string;
	validateErrors?: ValidateProfileError;
}
