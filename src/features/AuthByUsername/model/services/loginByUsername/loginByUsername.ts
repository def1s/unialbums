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

export const loginByUsername = createAsyncThunk<void, LoginByUsernameProps, { rejectValue: string }>(
	'login/loginByUsername',
	async (authData, thunkApi) => {
		try {
			const options: AxiosRequestConfig = {
				method: 'POST',
				url: `${__API_URL__}/login`,
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
				throw new Error('Что-то пошло не так');
			}

			const accessToken = response.data.data[0].accessToken;
			const { sub, ...userData }: UserJWTDecode = jwtDecode(accessToken);

			localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, accessToken);
			thunkApi.dispatch(userActions.setAuthData({ username: sub, ...userData }));
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message || 'Непредвиденная ошибка');
		}
	}
);
