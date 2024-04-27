import cls from './LoginForm.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { memo, useCallback } from 'react';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Blur } from 'shared/ui/Blur/Blur';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

interface LoginFormProps {
    className?: string;
	onSuccess?: () => void;
}

const initialReducers: ReducerList = {
	loginForm: loginReducer
};

export const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
	const dispatch = useAppDispatch();
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

	const onClickLogin = useCallback(async () => {
		const result = await dispatch(loginByUsername({ username, password }));
		if (result.meta.requestStatus === 'fulfilled' && onSuccess) {
			onSuccess();
		}
	}, [dispatch, onSuccess, password, username]);

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

				{error && <Text text={error} theme={TextTheme.ERROR}/>}

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
});
