import cls from './LoginForm.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { useCallback } from 'react';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, ThemeText } from 'shared/ui/Text/Text';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Blur } from 'shared/ui/Blur/Blur';

interface LoginFormProps {
    className?: string
}

const initialReducers: ReducerList = {
	loginForm: loginReducer
};

export const LoginForm = ({ className }: LoginFormProps) => {
	const dispatch = useDispatch();
	// не работает
	// const dispatch = useAppDispatch();
	const username = useSelector(getLoginUsername);
	const password = useSelector(getLoginPassword);
	const isLoading = useSelector(getLoginIsLoading);
	const error = useSelector(getLoginError);

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
		<DynamicModuleLoader
			reducers={initialReducers}
			removeAfterUnmount
		>
			<div className={classNames(cls.LoginForm, {}, [className])}>

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

				{error && <Text text={error} theme={ThemeText.ERROR}/>}

				<Button
					onClick={onClickLogin}
					className={cls.button}
					disabled={isLoading}
				>
					Вход
				</Button>
			</div>
		</DynamicModuleLoader>
	);
};
