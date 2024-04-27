export interface RegistrationSchema {
	username: string;
	password: string;
	repeatedPassword: string;
	isLoading: boolean;
	error?: string;
	message?: string;
	isPasswordsEqual: boolean;
}
