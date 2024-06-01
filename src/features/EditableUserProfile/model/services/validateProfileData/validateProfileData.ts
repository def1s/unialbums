import { ValidateProfileError } from '../../types/editableUserProfileSchema';
import { Profile } from 'entities/Profile';

export const validateProfileData = (data?: Profile) => {
	if (!data) {
		return {
			NO_DATA: true
		};
	}

	const {
		avatar,
		lastName,
		firstName,
		username
	} = data;

	const errors: ValidateProfileError = {};
	const reg = /^[a-zA-Z]+$/;

	if (firstName!.length < 2 || firstName!.length > 14 || !reg.test(firstName || '')) {
		errors.INCORRECT_FIRSTNAME = true;
	}

	if (lastName!.length < 2 || lastName!.length > 14 || !reg.test(lastName || '')) {
		errors.INCORRECT_LASTNAME = true;
	}

	if (username!.length < 4 || username!.length > 14) {
		errors.INCORRECT_USERNAME = true;
	}

	return errors;
};
