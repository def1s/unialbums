import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserSchema } from '../../model/types/user';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { userInitAuthData } from '../services/userInitAuthData/userInitAuthData';

const initialState: UserSchema = {
	_inited: false
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// setAuthData: (state, action: PayloadAction<User>) => {
		// 	state.authData = action.payload;
		// },
		logout: (state) => {
			localStorage.removeItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
			state.authData = undefined;
		}
		// iniAuthData: (state) => {
		// 	const authData = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
		// 	if (authData) {
		// 		try {
		// 			const { sub, ...userData }: UserJWTDecode = jwtDecode(authData);
		// 			state.authData = { username: sub, ...userData };
		// 		} catch (error) {
		// 			console.log(error);
		// 		}
		// 	}
		// 	state._inited = true;
		// }
	},
	extraReducers: builder => {
		builder.addCase(userInitAuthData.pending, (state) => {
			state._inited = false;
		});
		builder.addCase(userInitAuthData.fulfilled, (state, action) => {
			state.authData = action.payload;
			state._inited = true;
		});
		builder.addCase(userInitAuthData.rejected, (state) => {
			state._inited = true;
		});
	}
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
