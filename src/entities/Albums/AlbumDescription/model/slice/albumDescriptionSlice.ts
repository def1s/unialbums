import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAlbum } from 'shared/types';
import { deleteAlbum } from '../services/deleteAlbum/deleteAlbum';
import {
	fetchAlbumDescription
} from '../services/fetchAlbumDescription/fetchAlbumDescription';
import {
	AlbumDescriptionSchema
} from '../types/albumDescriptionSchema';

const initialState: AlbumDescriptionSchema = {
	isLoading: false,
	readonly: true,
	isEditable: false
};

const albumDescriptionSlice = createSlice({
	name: 'albumDescription',
	initialState,
	reducers: {
		updateAlbumDescription: (state, action: PayloadAction<IAlbum>) => {
			state.data = {
				...state.data,
				...action.payload
			};
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
		});
		builder.addCase(fetchAlbumDescription.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});

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
