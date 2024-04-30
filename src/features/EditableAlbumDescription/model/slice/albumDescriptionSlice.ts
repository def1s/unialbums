import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	EditableAlbumDescriptionSchema
} from '../types/editableAlbumDescriptionSchema';
import {
	fetchAlbumDescription
} from '../services/fetchAlbumDescription/fetchAlbumDescription';
import { Album } from 'entities/Albums';
import {
	updateAlbumDescription
} from '../services/updateAlbumDescription/updateAlbumDescription';

const initialState: EditableAlbumDescriptionSchema = {
	isLoading: false,
	readonly: true
};

const albumDescriptionSlice = createSlice({
	name: 'albumDescription',
	initialState,
	reducers: {
		setReadonly: (state, action: PayloadAction<boolean>) => {
			state.readonly = action.payload;
		},
		updateAlbumDescription: (state, action: PayloadAction<Album>) => {
			state.form = {
				...state.form,
				...action.payload
			};
		},
		resetForm: (state) => {
			state.form = state.data;
		}
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

		builder.addCase(updateAlbumDescription.pending, (state) => {
			state.error = undefined;
			state.message = undefined;
			state.isLoading = true;
		});
		builder.addCase(updateAlbumDescription.fulfilled, (state, action) => {
			state.isLoading = false;
			state.message = action.payload.message;
			state.data = state.form;
		});
		builder.addCase(updateAlbumDescription.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
	}
});

export const { actions: albumDescriptionActions } = albumDescriptionSlice;
export const { reducer: albumDescriptionReducer } = albumDescriptionSlice;
