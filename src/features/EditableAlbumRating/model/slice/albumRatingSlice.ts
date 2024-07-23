import { createSlice } from '@reduxjs/toolkit';
import { EditableAlbumRatingSchema } from '../types/editableAlbumRatingSchema';
import { fetchAlbumRating } from '../services/fetchAlbumRating/fetchAlbumRating';

const initialState: EditableAlbumRatingSchema = {
	isLoading: false,
	readonly: true,
	isEditable: false
};

const albumRatingSlice = createSlice({
	name: 'albumRatingSlice',
	initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		builder.addCase(fetchAlbumRating.pending, (state) => {
			state.error = undefined;
			state.isLoading = true;
		});
		builder.addCase(fetchAlbumRating.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		});
		builder.addCase(fetchAlbumRating.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
	}
});

export const { actions: albumRatingActions } = albumRatingSlice;
export const { reducer: albumRatingReducer } = albumRatingSlice;
