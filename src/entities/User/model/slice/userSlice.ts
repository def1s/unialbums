import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserJWTDecode, UserSchema } from '../../model/types/user';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { jwtDecode } from 'jwt-decode';

const initialState: UserSchema = {};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAuthData: (state, action: PayloadAction<User>) => {
			state.authData = action.payload;
		},
		logout: (state) => {
			localStorage.removeItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
			state.authData = undefined;
		},
		iniAuthData: (state) => {
			const authData = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
			if (authData) {
				try {
					const { sub, ...userData }: UserJWTDecode = jwtDecode(authData);
					state.authData = { username: sub, ...userData };
				} catch (error) {
					console.log(error);
				}
			}
		}
	}
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
