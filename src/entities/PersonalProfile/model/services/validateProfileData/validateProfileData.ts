import { IProfile } from 'shared/types';
import { ValidateProfileError } from '../../types/personalProfile';

export const validateProfileData = (data?: IProfile) => {
	if (!data) {
		return {
			INCORRECT_USERNAME: true,
			INCORRECT_LASTNAME: true,
			INCORRECT_FIRSTNAME: true
		};
	}

	const {
		lastName,
		firstName,
		username
	} = data;

	const errors: ValidateProfileError = {};

	/**
	 * ^[A-Za-zА-Яа-яЁё]+ — строка должна начинаться с одной или нескольких букв (латинских или кириллических,
	 * включая букву "ё").
	 * ([-'\s][A-Za-zА-Яа-яЁё]+)* — далее могут следовать группы, начинающиеся с дефиса, апострофа или пробела,
	 * за которыми следует одна или несколько букв. Эти группы могут повторяться ноль или более раз.
	 * $ — конец строки.
	 * u — модификатор, который включает поддержку юникода.
	 */
	const reg = /^[A-Za-zА-Яа-яЁё]+([-'\s][A-Za-zА-Яа-яЁё]+)*$/u;

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
