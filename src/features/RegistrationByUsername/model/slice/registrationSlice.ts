import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegistrationSchema, ValidateRegistrationErrors } from '../types/registrationSchema';
import { registration } from '../services/registration/registration';

const initialState: RegistrationSchema = {
	email: '',
	username: '',
	firstName: '',
	lastName: '',
	password: '',
	repeatedPassword: '',
	isLoading: false,
	isPasswordsEqual: true
};

const registrationSlice = createSlice({
	name: 'registration',
	initialState,
	reducers: {
		setEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload;
		},
		setUsername: (state, action: PayloadAction<string>) => {
			state.username = action.payload;
		},
		setFirstName: (state, action: PayloadAction<string>) => {
			state.firstName = action.payload;
		},
		setLastName: (state, action: PayloadAction<string>) => {
			state.lastName = action.payload;
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
		},
		setValidateErrors: (state, action: PayloadAction<ValidateRegistrationErrors>) => {
			state.validateErrors = action.payload;
		}
	},
	extraReducers: builder => {
		builder.addCase(registration.pending, (state) => {
			state.error = undefined;
			state.message = undefined;
			state.isLoading = true;
		});
		builder.addCase(registration.fulfilled, (state, action) => {
			state.isLoading = false;
			state.message = action.payload.message;
		});
		builder.addCase(registration.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
	}
});

export const { actions: registrationActions } = registrationSlice;
export const { reducer: registrationReducer } = registrationSlice;

