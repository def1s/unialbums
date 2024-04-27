import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegistrationSchema } from '../types/registrationSchema';

const initialState: RegistrationSchema = {
	username: '',
	password: '',
	repeatedPassword: '',
	isLoading: false,
	isPasswordsEqual: true
};

const registrationSlice = createSlice({
	name: 'registration',
	initialState,
	reducers: {
		setUsername: (state, action: PayloadAction<string>) => {
			state.username = action.payload;
		},
		setPassword: (state, action: PayloadAction<string>) => {
			if (state.repeatedPassword.length !== 0) {
				state.isPasswordsEqual = state.repeatedPassword === action.payload;
			}

			state.password = action.payload;
		},
		setRepeatedPassword: (state, action: PayloadAction<string>) => {
			state.isPasswordsEqual = state.password === action.payload;
			state.repeatedPassword = action.payload;
		}
	}
});

export const { actions: registrationActions } = registrationSlice;
export const { reducer: registrationReducer } = registrationSlice;

