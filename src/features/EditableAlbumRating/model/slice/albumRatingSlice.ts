import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EditableAlbumRatingSchema } from '../types/editableAlbumRatingSchema';
import { fetchAlbumRating } from '../services/fetchAlbumRating/fetchAlbumRating';
import { updateAlbumRating } from '../services/updateAlbumRating/updateAlbumRating';
import { IAlbumRating } from 'entities/Albums';

const initialState: EditableAlbumRatingSchema = {
	isLoading: false,
	readonly: true,
	isEditable: false
};

const albumRatingSlice = createSlice({
	name: 'albumRatingSlice',
	initialState,
	reducers: {
		setReadonly: (state, action: PayloadAction<boolean>) => {
			state.readonly = action.payload;
		},
		updateRatingSliders: (state, action: PayloadAction<IAlbumRating>) => {
			state.ratingSliders = {
				...state.ratingSliders,
				...action.payload
			};
		},
		resetRatingSliders: (state) => {
			state.ratingSliders = state.data;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAlbumRating.pending, (state) => {
			state.error = undefined;
			state.isLoading = true;
		});
		builder.addCase(fetchAlbumRating.fulfilled, (state, action) => {
			state.isLoading = false;
			const { isEditable, ...data } = action.payload;
			state.data = data;
			state.isEditable = !!isEditable;
			state.ratingSliders = action.payload;
		});
		builder.addCase(fetchAlbumRating.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});

		builder.addCase(updateAlbumRating.pending, (state) => {
			state.error = undefined;
			state.isLoading = true;
		});
		builder.addCase(updateAlbumRating.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = {
				...state.data,
				...action.payload.data
			};
			state.ratingSliders = state.data;
			state.serverMessage = action.payload.serverMessage;
		});
		builder.addCase(updateAlbumRating.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
	}
});

export const { actions: albumRatingActions } = albumRatingSlice;
export const { reducer: albumRatingReducer } = albumRatingSlice;
