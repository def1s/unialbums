import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAlbumRating } from 'shared/types';
import { fetchAlbumRating } from '../services/fetchAlbumRating/fetchAlbumRating';
import { AlbumRatingSchema } from '../types/albumRatingSchema';

const initialState: AlbumRatingSchema = {
	ratings: {
		isEditable: false,
		atmosphereRating: 1,
		bitsRating: 1,
		textRating: 1,
		tracksRating: 1,
		totalRating: 1
	},
	isLoading: false
};

const albumRatingSlice = createSlice({
	name: 'albumRating',
	initialState,
	reducers: {
		updateAlbumRating: (state, action: PayloadAction<IAlbumRating>) => {
			state.ratings = {
				...state.ratings,
				...action.payload,
			};
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAlbumRating.pending, (state) => {
			state.error = undefined;
			state.isLoading = true;
		});
		builder.addCase(fetchAlbumRating.fulfilled, (state, action: PayloadAction<IAlbumRating>) => {
			state.isLoading = false;
			state.ratings = action.payload;
		});
		builder.addCase(fetchAlbumRating.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
	}
});

export const { actions: albumRatingActions } = albumRatingSlice;
export const { reducer: albumRatingReducer } = albumRatingSlice;