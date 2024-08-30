import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Blur } from 'shared/ui/Blur/Blur';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { getRegistrationEmail } from '../../model/selectors/getRegistrationEmail/getRegistrationEmail';
import { getRegistrationError } from '../../model/selectors/getRegistrationError/getRegistrationError';
import { getRegistrationFirstName } from '../../model/selectors/getRegistrationFirstName/getRegistrationFirstName';
import { getRegistrationIsLoading } from '../../model/selectors/getRegistrationIsLoading/getRegistrationIsLoading';
import {
	getRegistrationIsPasswordsEqual
} from '../../model/selectors/getRegistrationIsPasswordsEqual/getRegistrationIsPasswordsEqual';
import { getRegistrationLastName } from '../../model/selectors/getRegistrationLastName/getRegistrationLastName';
import { getRegistrationMessage } from '../../model/selectors/getRegistrationMessage/getRegistrationMessage';
import { getRegistrationPassword } from '../../model/selectors/getRegistrationPassword/getRegistrationPassword';
import {
	getRegistrationRepeatedPassword
} from '../../model/selectors/getRegistrationRepeatedPassword/getRegistrationRepeatedPassword';
import { getRegistrationUsername } from '../../model/selectors/getRegistrationUsername/getRegistrationUsername';
import {
	getRegistrationValidateErrors
} from '../../model/selectors/getRegistrationValidateErrors/getRegistrationValidateErrors';
import { registration } from '../../model/services/registration/registration';
import { validateRegistrationForm } from '../../model/services/validateRegistrationForm/validateRegistrationForm';
import { registrationActions, registrationReducer } from '../../model/slice/registrationSlice';
import { ValidateRegistrationErrorsKeys } from '../../model/types/registrationSchema';
import cls from './RegistrationForm.module.scss';

interface RegistrationFormProps {
    className?: string;
}

const initialReducers: ReducerList = {
	registrationForm: registrationReducer
};

export const RegistrationForm = ({ className }: RegistrationFormProps) => {
	const dispatch = useAppDispatch();
	const email = useSelector(getRegistrationEmail);
	const username = useSelector(getRegistrationUsername);
	const firstName = useSelector(getRegistrationFirstName);
	const lastName = useSelector(getRegistrationLastName);
	const password = useSelector(getRegistrationPassword);
	const repeatedPassword = useSelector(getRegistrationRepeatedPassword);
	const isLoading = useSelector(getRegistrationIsLoading);
	const error = useSelector(getRegistrationError);
	const isPasswordsEqual = useSelector(getRegistrationIsPasswordsEqual);
	const message = useSelector(getRegistrationMessage);
	const validateErrors = useSelector(getRegistrationValidateErrors);

	const getDataForValidation = useCallback(() => ({
		firstName,
		lastName,
		username,
		password
	}), [firstName, lastName, password, username]);

	// TODO провадилировать поле с почтой
	const onChangeEmail = useCallback((email: string) => {
		dispatch(registrationActions.setEmail(email));
	}, [dispatch]);

	const onChangeUsername = useCallback((username: string) => {
		const errors = validateRegistrationForm({ ...getDataForValidation(), username });
		dispatch(registrationActions.setValidateErrors(errors));
		dispatch(registrationActions.setUsername(username));
	}, [getDataForValidation, dispatch]);

	const onChangeFirstName = useCallback((firstName: string) => {
		const errors = validateRegistrationForm({ ...getDataForValidation(), firstName });
		dispatch(registrationActions.setValidateErrors(errors));
		dispatch(registrationActions.setFirstName(firstName));
	}, [getDataForValidation, dispatch]);

	const onChangeLastName = useCallback((lastName: string) => {
		const errors = validateRegistrationForm({ ...getDataForValidation(), lastName });
		dispatch(registrationActions.setValidateErrors(errors));
		dispatch(registrationActions.setLastName(lastName));
	}, [getDataForValidation, dispatch]);

	const onChangePassword = useCallback((password: string) => {
		const errors = validateRegistrationForm({ ...getDataForValidation(), password });
		dispatch(registrationActions.setValidateErrors(errors));
		dispatch(registrationActions.setPassword(password));
	}, [getDataForValidation, dispatch]);

	const onChangeRepeatedPassword = useCallback((value: string) => {
		dispatch(registrationActions.setRepeatedPassword(value));
	}, [dispatch]);

	const onClickRegistration = () => {
		if (isPasswordsEqual) {
			dispatch(registration({
				email,
				username,
				password,
				firstName,
				lastName
			}));
		}
	};

	// ошибки валидации
	const validateErrorsTranslates: Record<ValidateRegistrationErrorsKeys, string> = {
		INCORRECT_FIRSTNAME: 'Некорректно заполнено имя',
		INCORRECT_LASTNAME: 'Некорректно заполнена фамилия',
		INCORRECT_USERNAME: 'Некорректно заполнено имя пользователя',
		INCORRECT_PASSWORD: 'Некорректно заполнен пароль'
	};

	return (
		<DynamicModuleLoader
			reducers={initialReducers}
			removeAfterUnmount
		>
			<div className={classNames(cls.RegistrationForm, {}, [className])}>
				{
					isLoading && !error && (
						<>
							<Loader/>
							<Blur className={cls.blurBorder}/>
						</>
					)
				}

				<Input
					className={cls.input}
					label={'Почта'}
					value={email}
					onChange={onChangeEmail}
					type={'email'}
					required={true}
				/>

				{validateErrors?.INCORRECT_USERNAME && <Text text={validateErrorsTranslates.INCORRECT_USERNAME} theme={TextTheme.ERROR}/>}
				<Input
					className={cls.input}
					label={'Имя пользователя'}
					value={username}
					onChange={onChangeUsername}
					required={true}
				/>

				{validateErrors?.INCORRECT_FIRSTNAME && <Text text={validateErrorsTranslates.INCORRECT_FIRSTNAME} theme={TextTheme.ERROR}/>}
				<Input
					className={cls.input}
					label={'Имя'}
					value={firstName}
					onChange={onChangeFirstName}
				/>

				{validateErrors?.INCORRECT_LASTNAME && <Text text={validateErrorsTranslates.INCORRECT_LASTNAME} theme={TextTheme.ERROR}/>}
				<Input
					className={cls.input}
					label={'Фамилия'}
					value={lastName}
					onChange={onChangeLastName}
				/>

				{validateErrors?.INCORRECT_PASSWORD && <Text text={validateErrorsTranslates.INCORRECT_PASSWORD} theme={TextTheme.ERROR}/>}
				<Input
					className={cls.input}
					label={'Пароль'}
					value={password}
					type={'password'}
					onChange={onChangePassword}
					required={true}
					error={validateErrors?.INCORRECT_PASSWORD ? validateErrorsTranslates.INCORRECT_PASSWORD : undefined}
				/>

				<Input
					className={cls.input}
					label={'Повторите пароль'}
					value={repeatedPassword}
					type={'password'}
					required={true}
					onChange={onChangeRepeatedPassword}
				/>

				{!isPasswordsEqual && <Text text={'Пароли не совпадают'} theme={TextTheme.ERROR}/>}

				{message && <Text text={message} theme={TextTheme.SUCCESSFUL}/>}

				{error && <Text text={error} theme={TextTheme.ERROR}/>}

				<Button
					className={cls.button}
					onClick={onClickRegistration}
					disabled={
						!isPasswordsEqual ||
						password.length === 0 ||
						repeatedPassword.length === 0 ||
						validateErrors && !!Object.keys(validateErrors).length
					}
				>
					Зарегистрироваться
				</Button>
			</div>
		</DynamicModuleLoader>
	);
};
