import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPersonalProfileData } from 'entities/PersonalProfile/model/services/fetchPersonalProfileData/fetchPersonalProfileData';
import { IProfile } from 'shared/types';
import { PersonalProfileSchema } from '../types/personalProfile';

const initialState: PersonalProfileSchema = {
	isLoading: false
};

const personalProfileSlice = createSlice({
	name: 'personalProfile',
	initialState,
	reducers: {
		updateProfile: (state, action: PayloadAction<IProfile>) => {
			state.data = {
				...state.data,
				...action.payload
			};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPersonalProfileData.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(fetchPersonalProfileData.fulfilled, (state, action: PayloadAction<IProfile>) => {
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(fetchPersonalProfileData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});

		// .addCase(updateProfileData.pending, (state) => {
		// 	state.validateErrors = undefined;
		// 	state.serverMessage = undefined;
		// 	state.isLoading = true;
		// })
		// .addCase(updateProfileData.fulfilled, (state, action) => {
		// 	state.isLoading = false;
		// 	state.serverMessage = action.payload.serverMessage;
		// 	state.data = state.form;
		// })
		// .addCase(updateProfileData.rejected, (state, action) => {
		// 	state.isLoading = false;
		// 	state.error = action.payload;
		// });
	}
});

export const { actions: personalProfileActions } = personalProfileSlice;
export const { reducer: personalProfileReducer } = personalProfileSlice;
