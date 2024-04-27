import cls from './RegistrationForm.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';
import { registrationActions, registrationReducer } from '../../model/slice/registrationSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import {
	getRegistrationUsername
} from '../../model/selectors/getRegistrationUsername/getRegistrationUsername';
import {
	getRegistrationPassword
} from '../../model/selectors/getRegistrationPassword/getRegistrationPassword';
import {
	getRegistrationRepeatedPassword
} from '../../model/selectors/getRegistrationRepeatedPassword/getRegistrationRepeatedPassword';
import {
	getRegistrationIsLoading
} from '../../model/selectors/getRegistrationIsLoading/getRegistrationIsLoading';
import {
	getRegistrationError
} from '../../model/selectors/getRegistrationError/getRegistrationError';
import { useCallback } from 'react';
import { Loader } from 'shared/ui/Loader/Loader';
import { Blur } from 'shared/ui/Blur/Blur';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import {
	getRegistrationIsPasswordsEqual
} from '../../model/selectors/getRegistrationIsPasswordsEqual/getRegistrationIsPasswordsEqual';
import { registration } from '../../model/services/registration/registration';
import {
	getRegistrationFirstName
} from '../../model/selectors/getRegistrationFirstName/getRegistrationFirstName';
import {
	getRegistrationLastName
} from '../../model/selectors/getRegistrationLastName/getRegistrationLastName';
import {
	getRegistrationMessage
} from 	'../../model/selectors/getRegistrationMessage/getRegistrationMessage';

interface RegistrationFormProps {
    className?: string;
}

const initialReducers: ReducerList = {
	registrationForm: registrationReducer
};

export const RegistrationForm = ({ className }: RegistrationFormProps) => {
	const dispatch = useAppDispatch();
	const username = useSelector(getRegistrationUsername);
	const firstName = useSelector(getRegistrationFirstName);
	const lastName = useSelector(getRegistrationLastName);
	const password = useSelector(getRegistrationPassword);
	const repeatedPassword = useSelector(getRegistrationRepeatedPassword);
	const isLoading = useSelector(getRegistrationIsLoading);
	const error = useSelector(getRegistrationError);
	const isPasswordsEqual = useSelector(getRegistrationIsPasswordsEqual);
	const message = useSelector(getRegistrationMessage);

	const onChangeUsername = useCallback((value: string) => {
		dispatch(registrationActions.setUsername(value));
	}, [dispatch]);

	const onChangeFirstName = useCallback((value: string) => {
		dispatch(registrationActions.setFirstName(value));
	}, [dispatch]);

	const onChangeLastName = useCallback((value: string) => {
		dispatch(registrationActions.setLastName(value));
	}, [dispatch]);

	const onChangePassword = useCallback((value: string) => {
		dispatch(registrationActions.setPassword(value));
	}, [dispatch]);

	const onChangeRepeatedPassword = useCallback((value: string) => {
		dispatch(registrationActions.setRepeatedPassword(value));
	}, [dispatch]);

	const onClickRegistration = () => {
		if (isPasswordsEqual) {
			dispatch(registration({
				username,
				password,
				firstName,
				lastName
			}));
		}
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
					placeholder={'Имя пользователя'}
					value={username}
					onChange={onChangeUsername}
				/>

				<Input
					className={cls.input}
					placeholder={'Имя'}
					value={firstName}
					onChange={onChangeFirstName}
				/>

				<Input
					className={cls.input}
					placeholder={'Фамилия'}
					value={lastName}
					onChange={onChangeLastName}
				/>

				<Input
					className={cls.input}
					placeholder={'Пароль'}
					value={password}
					type={'password'}
					onChange={onChangePassword}
				/>

				<Input
					className={cls.input}
					placeholder={'Повторите пароль'}
					value={repeatedPassword}
					type={'password'}
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
						repeatedPassword.length === 0
					}
				>
					Зарегистрироваться
				</Button>
			</div>
		</DynamicModuleLoader>
	);
};
