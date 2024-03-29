import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';
import { User, userActions } from 'entities/User';

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
				data: authData,
				withCredentials: true
			};

			const response = await axios<User>(options);

			if (!response.data) {
				throw new Error('Something went wrong...');
			}

			thunkApi.dispatch(userActions.setAuthData(response.data));
		} catch (error) {
			console.log(error);
			return thunkApi.rejectWithValue('Что-то не так...');
		}
	}
);
