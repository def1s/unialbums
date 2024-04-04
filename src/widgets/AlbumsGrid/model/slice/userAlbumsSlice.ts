import { createSlice } from '@reduxjs/toolkit';
import { UserAlbumsSchema } from '../types/userAlbumsSchema';
import { getAlbumsByAccessToken } from '../services/getAlbumsByAccessToken/getAlbumsByAccessToken';

const initialState: UserAlbumsSchema = {
	albums: [],
	isLoading: false
};

const userAlbumsSlice = createSlice({
	name: 'userAlbums',
	initialState,
	reducers: {

	},
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

export const { actions: userAlbumsActions } = userAlbumsSlice;
export const { reducer: userAlbumsReducer } = userAlbumsSlice;
