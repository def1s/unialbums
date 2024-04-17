import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile, ProfileSchema } from '../types/profile';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';

const initialState: ProfileSchema = {
	isLoading: false,
	readonly: true
};

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		builder.addCase(fetchProfileData.pending, (state) => {
			state.error = undefined;
			state.isLoading = true;
		});

		builder.addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
			state.isLoading = false;
			state.data = action.payload;
		});

		builder.addCase(fetchProfileData.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
	}
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
