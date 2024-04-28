import { createSlice } from '@reduxjs/toolkit';
import { UserSchema } from '../../model/types/user';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { userInitAuthData } from '../services/userInitAuthData/userInitAuthData';

const initialState: UserSchema = {
	_inited: false
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state) => {
			localStorage.removeItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
			state.authData = undefined;
		}
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
