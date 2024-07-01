export interface Profile {
	firstName?: string;
	lastName?: string;
	username?: string;
	avatar?: string;
}

export interface ValidateProfileError {
	INCORRECT_FIRSTNAME?: boolean;
	INCORRECT_LASTNAME?: boolean;
	INCORRECT_USERNAME?: boolean;
}

export type ValidateProfileErrorKeys = keyof ValidateProfileError;
