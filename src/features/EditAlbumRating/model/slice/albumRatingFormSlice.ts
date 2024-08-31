import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlbumRatingSchema } from 'entities/Albums/AlbumRating';
import { IAlbumRating } from 'shared/types';

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
	// extraReducers: builder => {
	// 	builder.addCase(updateAlbumDescription.pending, (state) => {
	// 		state.error = undefined;
	// 		state.isLoading = true;
	// 	});
	// 	builder.addCase(updateAlbumDescription.fulfilled, (state) => {
	// 		state.isLoading = false;
	// 	});
	// 	builder.addCase(updateAlbumDescription.rejected, (state) => {
	// 		state.isLoading = false;
	// 	});
	// }
});

export const { actions: albumRatingFormActions } = albumRatingFormSlice;
export const { reducer: albumRatingFormReducer } = albumRatingFormSlice;
