import { IProfile } from 'shared/types';

export interface ValidateProfileError {
	INCORRECT_FIRSTNAME?: boolean;
	INCORRECT_LASTNAME?: boolean;
	INCORRECT_USERNAME?: boolean;
}

export type ValidateProfileErrorKeys = keyof ValidateProfileError;

export interface PersonalProfileSchema {
	data?: IProfile;
	isLoading: boolean;
	error?: string;
}
