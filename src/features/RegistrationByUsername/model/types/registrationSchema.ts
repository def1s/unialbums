export interface ValidateRegistrationErrors {
	INCORRECT_FIRSTNAME?: boolean;
	INCORRECT_LASTNAME?: boolean;
	INCORRECT_USERNAME?: boolean;
	INCORRECT_PASSWORD?: boolean;
}

export type ValidateRegistrationErrorsKeys = keyof ValidateRegistrationErrors;

export interface RegistrationSchema {
	email: string;
	username: string;
	firstName: string;
	lastName: string;
	password: string;
	repeatedPassword: string;
	isLoading: boolean;
	error?: string;
	message?: string;
	isPasswordsEqual: boolean;
	validateErrors?: ValidateRegistrationErrors;
}
