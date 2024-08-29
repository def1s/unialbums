import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAlbumForm } from 'shared/types';
import { addAlbumToUser } from '../services/addAlbumToUser/addAlbumToUser';
import { getAlbumSpotify } from '../services/getAlbumSpotify/getAlbumSpotify';
import { searchAlbumsSpotify } from '../services/searchAlbumsSpotify/searchAlbumsSpotify';
import { AlbumFormSchema } from '../types/albumFormSchema';

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
		setFieldValue: (state, action: PayloadAction<IAlbumForm>) => {
			state.data = {
				...state.data,
				...action.payload
			};
		}
	},
	extraReducers: (builder) => {
		/**
		 * добавление альбома
		 */
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

		/**
		 * поиск альбома
		 */
		builder.addCase(searchAlbumsSpotify.pending, (state) => {
			state.error = undefined;
			state.isSearching = true;
		});
		builder.addCase(searchAlbumsSpotify.fulfilled, (state, action) => {
			state.isSearching = false;
			state.searchAlbums = action.payload;
		});
		builder.addCase(searchAlbumsSpotify.rejected, (state, action) => {
			// payload не будет только если запрос был отменен вручную через abortController
			if (action.payload) {
				state.isSearching = false;
			}
			state.error = action.payload;
		});

		/**
		 * получение информации об альбоме по клику на элемент поиска
		 */
		builder.addCase(getAlbumSpotify.pending, (state) => {
			state.error = undefined;
			state.isLoading = true;
		});
		builder.addCase(getAlbumSpotify.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data.title = action.payload.title;
			state.data.artist = action.payload.artists?.join(', ');
			state.data.cover = action.payload.cover;
		});
		builder.addCase(getAlbumSpotify.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
	}
});

export const { actions: albumFormActions } = albumFormSlice;
export const { reducer: albumFormReducer } = albumFormSlice;
