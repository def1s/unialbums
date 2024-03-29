import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserSchema } from '../../model/types/user';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

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
		}
	}
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
