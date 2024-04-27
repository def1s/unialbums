export interface RegistrationSchema {
	username: string;
	firstName: string;
	lastName: string;
	password: string;
	repeatedPassword: string;
	isLoading: boolean;
	error?: string;
	message?: string;
	isPasswordsEqual: boolean;
}
