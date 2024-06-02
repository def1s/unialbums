import { RegistrationSchema, ValidateRegistrationErrors } from '../../types/registrationSchema';

interface RegistrationForm extends Pick<RegistrationSchema, 'username' | 'lastName' | 'firstName' | 'password'> {}

export const validateRegistrationForm = (form: RegistrationForm) => {
	const {
		firstName,
		lastName,
		username,
		password
	} = form;

	const errors: ValidateRegistrationErrors = {};

	/**
	 * ^[A-Za-zА-Яа-яЁё]+ — строка должна начинаться с одной или нескольких букв (латинских или кириллических,
	 * включая букву "ё").
	 * ([-'\s][A-Za-zА-Яа-яЁё]+)* — далее могут следовать группы, начинающиеся с дефиса, апострофа или пробела,
	 * за которыми следует одна или несколько букв. Эти группы могут повторяться ноль или более раз.
	 * $ — конец строки.
	 * u — модификатор, который включает поддержку юникода.
	 */
	const personInfoRegex = /^[A-Za-zА-Яа-яЁё]+([-'\s][A-Za-zА-Яа-яЁё]+)*$/u;

	/**
	 * 	^(?!.*[_.]{2}) — негативный просмотр вперед, который запрещает последовательность двух подчеркиваний или
	 * 	двух точек в любом месте строки.
	 * 	[a-zA-Z0-9._]$ — разрешает буквы (как заглавные, так и строчные), цифры, подчеркивания и точки,
	 * 	$ — конец строки.
	 */
	const usernameRegex = /^(?!.*[_.]{2})[a-zA-Z0-9._]+$/;

	if (firstName.length > 0 && (firstName.length < 2 || firstName.length > 14 || !personInfoRegex.test(firstName))) {
		errors.INCORRECT_FIRSTNAME = true;
	}

	if (lastName.length > 0 && (lastName.length < 2 || lastName.length > 14 || !personInfoRegex.test(lastName))) {
		errors.INCORRECT_LASTNAME = true;
	}

	if (username.length > 0 && (username.length < 4 || username.length > 14 || !usernameRegex.test(username))) {
		errors.INCORRECT_USERNAME = true;
	}

	if (password.length > 0 && (password.length < 4 || password.length > 20)) {
		errors.INCORRECT_PASSWORD = true;
	}

	return errors;
};
