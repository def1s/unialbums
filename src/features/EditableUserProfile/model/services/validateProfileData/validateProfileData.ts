import { ValidateProfileError } from '../../types/editableUserProfileSchema';
import { Profile } from 'entities/Profile';

export const validateProfileData = (data?: Profile) => {
	if (!data) {
		return [ValidateProfileError.NO_DATA];
	}

	const {
		avatar,
		lastName,
		firstName,
		username
	} = data;

	const errors: ValidateProfileError[] = [];
	const reg = /^[a-zA-Z]+$/;

	if (firstName!.length < 2 || firstName!.length > 14 || !reg.test(firstName || '')) {
		errors.push(ValidateProfileError.INCORRECT_FIRSTNAME);
	}

	if (lastName!.length < 2 || lastName!.length > 14 || !reg.test(lastName || '')) {
		errors.push(ValidateProfileError.INCORRECT_LASTNAME);
	}

	if (username!.length < 4 || username!.length > 14) {
		errors.push(ValidateProfileError.INCORRECT_USERNAME);
	}

	return errors;
};
