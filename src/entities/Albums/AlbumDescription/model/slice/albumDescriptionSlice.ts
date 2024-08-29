import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	AlbumDescriptionSchema
} from '../types/albumDescriptionSchema';
import {
	fetchAlbumDescription
} from '../services/fetchAlbumDescription/fetchAlbumDescription';
import { IAlbum } from 'entities/Albums';
import { deleteAlbum } from '../services/deleteAlbum/deleteAlbum';

const initialState: AlbumDescriptionSchema = {
	isLoading: false,
	readonly: true,
	isEditable: false
};

const albumDescriptionSlice = createSlice({
	name: 'albumDescription',
	initialState,
	reducers: {
		setReadonly: (state, action: PayloadAction<boolean>) => {
			state.readonly = action.payload;
		},
		updateAlbumDescription: (state, action: PayloadAction<IAlbum>) => {
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
			const { isEditable, ...data } = action.payload;
			state.data = data;
			state.isEditable = !!isEditable;
			state.form = action.payload;
		});
		builder.addCase(fetchAlbumDescription.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});

		// builder.addCase(updateAlbumDescription.pending, (state) => {
		// 	state.error = undefined;
		// 	state.serverMessage = undefined;
		// 	state.isLoading = true;
		// });
		// builder.addCase(updateAlbumDescription.fulfilled, (state, action) => {
		// 	state.isLoading = false;
		// 	state.serverMessage = action.payload.serverMessage;
		// 	state.data = state.form;
		// });
		// builder.addCase(updateAlbumDescription.rejected, (state, action) => {
		// 	state.isLoading = false;
		// 	state.error = action.payload;
		// });

		builder.addCase(deleteAlbum.pending, (state) => {
			state.error = undefined;
			state.serverMessage = undefined;
			state.isLoading = true;
		});
		builder.addCase(deleteAlbum.fulfilled, (state, action) => {
			state.isLoading = false;
			state.serverMessage = action.payload;
		});
		builder.addCase(deleteAlbum.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
	}
});

export const { actions: albumDescriptionActions } = albumDescriptionSlice;
export const { reducer: albumDescriptionReducer } = albumDescriptionSlice;
