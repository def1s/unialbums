import { createSlice } from '@reduxjs/toolkit';
import { getAlbumsByAccessToken } from '../services/getAlbumsByAccessToken/getAlbumsByAccessToken';
import { HomePageSchema } from '../types/homePageSchema';

const initialState: HomePageSchema = {
	albums: [],
	isLoading: false
};

const homePageSlice = createSlice({
	name: 'homePage',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAlbumsByAccessToken.pending, (state) => {
			state.error = undefined;
			state.isLoading = true;
		});

		builder.addCase(getAlbumsByAccessToken.fulfilled, (state, action) => {
			state.isLoading = false;
			state.albums = action.payload;
		});

		builder.addCase(getAlbumsByAccessToken.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
	}
});

export const { actions: homePageActions } = homePageSlice;
export const { reducer: homePageReducer } = homePageSlice;
