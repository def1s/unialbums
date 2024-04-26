import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from 'entities/Profile';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { EditableUserProfileSchema } from '../types/editableUserProfileSchema';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';

const initialState: EditableUserProfileSchema = {
	isLoading: false,
	readonly: true
};

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setReadonly: (state, action: PayloadAction<boolean>) => {
			state.readonly = action.payload;
		},
		updateProfile: (state, action: PayloadAction<Profile>) => {
			state.form = {
				...state.form,
				...action.payload
			};
		},
		resetForm: (state) => {
			state.form = state.data;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProfileData.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
				state.isLoading = false;
				state.data = action.payload;
				state.form = action.payload;
			})
			.addCase(fetchProfileData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			.addCase(updateProfileData.pending, (state) => {
				state.error = undefined;
				state.message = undefined;
				state.isLoading = true;
			})
			.addCase(updateProfileData.fulfilled, (state, action) => {
				state.isLoading = false;
				state.message = action.payload.message;
				state.data = state.form;
			})
			.addCase(updateProfileData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	}
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
