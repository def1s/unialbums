import cls from './LoginForm.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginActions } from 'features/AuthByUsername/model/slice/loginSlice';
import { ChangeEvent } from 'react';
import { useAppDispatch } from 'app/providers/StoreProvider';

interface LoginFormProps {
    className?: string
}

export const LoginForm = ({ className }: LoginFormProps) => {
	// const dispatch = useDispatch();
	const dispatch = useAppDispatch();
	const { username, password } = useSelector(getLoginState);

	const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(loginActions.setUsername(e.target.value));
	};

	const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(loginActions.setPassword(e.target.value));
	};

	const onClickLogin = () => {
		//
	};

	return (
		<div className={classNames(cls.LoginForm, {}, [className])}>
			<input
				className={cls.input}
				placeholder={'Username'}
				onChange={e => onChangeUsername(e)}
				value={username}
			/>
			<input
				className={cls.input}
				placeholder={'Password'}
				onChange={e => onChangePassword(e)}
				value={password}
			/>
			<button>Вход</button>
		</div>
	);
};
