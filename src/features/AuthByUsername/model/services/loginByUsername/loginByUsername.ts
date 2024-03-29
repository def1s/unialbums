import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';
import { User, userActions, UserResponse } from 'entities/User';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

interface LoginByUsernameProps {
	username: string;
	password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, { rejectValue: string }>(
	'login/loginByUsername',
	async (authData, thunkApi) => {
		try {
			const options: AxiosRequestConfig = {
				method: 'POST',
				url: 'http://localhost:8081/login',
				headers: {
					'Content-Type': 'application/json'
				},
				data: {
					login: authData.username,
					password: authData.password
				},
				withCredentials: true
			};

			const response = await axios<UserResponse>(options);

			if (!response) {
				throw new Error('Something went wrong...');
			}

			// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
			const { accessToken, type, ...userData } = response.data;
			localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, accessToken);
			thunkApi.dispatch(userActions.setAuthData(userData));
		} catch (error) {
			console.log(error);
			return thunkApi.rejectWithValue('Неверные имя пользователя или пароль');
		}
	}
);
