import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';
import { User, userActions, UserJWTDecode } from 'entities/User';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { ApiResponse, token } from 'shared/api/types/apiResponse';
import { jwtDecode } from 'jwt-decode';

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

			const response = await axios<ApiResponse<token>>(options);

			if (!response.data) {
				throw new Error('Something went wrong...');
			}

			const accessToken = response.data.data.access_token;
			const { sub, ...userData }: UserJWTDecode = jwtDecode(accessToken);

			localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, accessToken);
			thunkApi.dispatch(userActions.setAuthData({ username: sub, ...userData }));
		} catch (error) {
			console.log(error);
			return thunkApi.rejectWithValue('Неверные имя пользователя или пароль');
		}
	}
);
