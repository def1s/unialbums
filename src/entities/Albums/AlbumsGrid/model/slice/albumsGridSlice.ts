import { createSlice } from '@reduxjs/toolkit';
import { fetchAlbumsByAccessToken } from '../services/fetchAlbumsByAccessToken';
import { fetchAlbumsByUserId } from '../services/fetchAlbumsByUserId';
import { AlbumsGridSchema } from '../types/albumsGridSchema';

const initialState: AlbumsGridSchema = {
	albums: [],
	isLoading: false
};

const albumsGridSlice = createSlice({
	name: 'albumsGrid',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchAlbumsByUserId.pending, (state) => {
			state.error = undefined;
			state.isLoading = true;
		});

		builder.addCase(fetchAlbumsByUserId.fulfilled, (state, action) => {
			state.isLoading = false;
			state.albums = action.payload;
		});

		builder.addCase(fetchAlbumsByUserId.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});

		builder.addCase(fetchAlbumsByAccessToken.pending, (state) => {
			state.error = undefined;
			state.isLoading = true;
		});

		builder.addCase(fetchAlbumsByAccessToken.fulfilled, (state, action) => {
			state.isLoading = false;
			state.albums = action.payload;
		});

		builder.addCase(fetchAlbumsByAccessToken.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
	}
});

export const { actions: albumsGridActions } = albumsGridSlice;
export const { reducer: albumsGridReducer } = albumsGridSlice;
