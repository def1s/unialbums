import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlbumForm, AlbumFormSchema } from '../types/albumFormSchema';
import { addAlbumToUser } from '../services/addAlbumToUser/addAlbumToUser';
import { searchAlbumsSpotify } from '../services/searchAlbumsSpotify/searchAlbumsSpotify';

const initialState: AlbumFormSchema = {
	data: {
		cover: '',
		title: '',
		artist: '',
		atmosphereRating: 1,
		textRating: 1,
		tracksRating: 1,
		bitsRating: 1,
	},
	isSearching: false,
	isLoading: false
};

const albumFormSlice = createSlice({
	name: 'albumForm',
	initialState,
	reducers: {
		setFieldValue: (state, action: PayloadAction<AlbumForm>) => {
			state.data = {
				...state.data,
				...action.payload
			};
		}
	},
	extraReducers: (builder) => {
		builder.addCase(addAlbumToUser.pending, (state) => {
			state.error = undefined;
			state.serverMessage = undefined;
			state.isLoading = true;
		});

		builder.addCase(addAlbumToUser.fulfilled, (state, action) => {
			state.isLoading = false;
			state.serverMessage = action.payload.serverMessage;
		});

		builder.addCase(addAlbumToUser.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});

		builder.addCase(searchAlbumsSpotify.pending, (state) => {
			state.error = undefined;
			state.isSearching = true;
		});
		builder.addCase(searchAlbumsSpotify.fulfilled, (state, action) => {
			state.isSearching = false;
			state.searchAlbums = action.payload;
		});
		builder.addCase(searchAlbumsSpotify.rejected, (state, action) => {
			state.isSearching = false;
			state.error = action.payload;
		});
	}
});

export const { actions: albumFormActions } = albumFormSlice;
export const { reducer: albumFormReducer } = albumFormSlice;
