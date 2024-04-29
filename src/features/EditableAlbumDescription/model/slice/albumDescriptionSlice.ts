import { createSlice } from '@reduxjs/toolkit';
import {
	EditableAlbumDescriptionSchema
} from '../types/editableAlbumDescriptionSchema';
import {
	fetchAlbumDescription
} from '../services/fetchAlbumDescription/fetchAlbumDescription';

const initialState: EditableAlbumDescriptionSchema = {
	isLoading: false,
	readonly: true
};

const albumDescriptionSlice = createSlice({
	name: 'albumDescription',
	initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		builder.addCase(fetchAlbumDescription.pending, (state) => {
			state.error = undefined;
			state.isLoading = true;
		});
		builder.addCase(fetchAlbumDescription.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
			state.form = action.payload;
		});
		builder.addCase(fetchAlbumDescription.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
	}
});

export const { actions: albumDescriptionActions } = albumDescriptionSlice;
export const { reducer: albumDescriptionReducer } = albumDescriptionSlice;
