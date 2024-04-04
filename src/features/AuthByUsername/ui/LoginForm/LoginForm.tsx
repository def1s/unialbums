import cls from './LoginForm.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginActions } from 'features/AuthByUsername/model/slice/loginSlice';
import { useCallback } from 'react';
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, ThemeText } from 'shared/ui/Text/Text';

interface LoginFormProps {
    className?: string
}

export const LoginForm = ({ className }: LoginFormProps) => {
	const dispatch = useDispatch();
	// не работает
	// const dispatch = useAppDispatch();
	const { username, password, isLoading, error } = useSelector(getLoginState);

	const onChangeUsername = useCallback((value: string) => {
		dispatch(loginActions.setUsername(value));
	}, [dispatch]);

	const onChangePassword = useCallback((value: string) => {
		dispatch(loginActions.setPassword(value));
	}, [dispatch]);

	const onClickLogin = useCallback(() => {
		// по каким-то абсолютно неясным причинам при использовании useAppDispatch loginReducer оказывается
		// равен undefined и мне приходится игнорировать его, используя обычный dispatch.
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		dispatch(loginByUsername({ username, password }));
	}, [dispatch, password, username]);

	return (
		<div className={classNames(cls.LoginForm, {}, [className])}>

			{ isLoading && <Loader /> }

			<Input
				className={cls.input}
				placeholder={'Имя пользователя'}
				onChange={onChangeUsername}
				value={username}
				type='text'
			/>
			<Input
				className={cls.input}
				placeholder={'Пароль'}
				onChange={onChangePassword}
				value={password}
				type='password'
			/>

			{ error &&  <Text text={error} theme={ThemeText.ERROR}/>}

			<Button
				onClick={onClickLogin}
				className={cls.button}
				disabled={isLoading}
			>
				Вход
			</Button>
		</div>
	);
};
