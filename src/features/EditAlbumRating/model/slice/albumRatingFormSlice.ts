import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlbumRatingSchema } from 'entities/Albums/AlbumRating';
import { IAlbumRating } from 'shared/types';
import { updateAlbumRating } from '../services/updateAlbumRating/updateAlbumRating';

const initialState: AlbumRatingSchema = {
	ratings: {
		isEditable: false,
		tracksRating: 1,
		totalRating: 1,
		textRating: 1,
		bitsRating: 1,
		atmosphereRating: 1
	},
	isLoading: false
};

const albumRatingFormSlice = createSlice({
	name: 'albumRatingForm',
	initialState,
	reducers: {
		initAlbumRatingForm: (state, action: PayloadAction<IAlbumRating>) => {
			state.ratings = {
				...action.payload
			};
		},
		updateAlbumRatingForm: (state, action: PayloadAction<IAlbumRating>) => {
			state.ratings = {
				...state.ratings,
				...action.payload
			};
		}
	},
	extraReducers: builder => {
		builder.addCase(updateAlbumRating.pending, (state) => {
			state.error = undefined;
			state.isLoading = true;
		});
		builder.addCase(updateAlbumRating.fulfilled, (state) => {
			state.isLoading = false;
		});
		builder.addCase(updateAlbumRating.rejected, (state) => {
			state.isLoading = false;
		});
	}
});

export const { actions: albumRatingFormActions } = albumRatingFormSlice;
export const { reducer: albumRatingFormReducer } = albumRatingFormSlice;
