import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlbumDescriptionFormSchema, IAlbumDescriptionForm } from '../types/albumDescriptionFormSchema';

const initialState: AlbumDescriptionFormSchema = {
	data: {
		artist: '',
		cover: '',
		title: ''
	},
	isLoading: false
};

const albumDescriptionFormSlice = createSlice({
	name: 'albumDescriptionFormSlice',
	initialState,
	reducers: {
		initAlbumDescriptionForm: (state, action: PayloadAction<IAlbumDescriptionForm>) => {
			state.data = {
				...action.payload
			};
		},
		updateAlbumDescriptionForm: (state, action: PayloadAction<IAlbumDescriptionForm>) => {
			state.data = {
				...state.data,
				...action.payload
			};
		},
		// resetForm: (state) => {
		// 	state.form = state.data;
		// }
	},
	// extraReducers: (builder) => {
	// 	builder.addCase(fetchAlbumDescription.pending, (state) => {
	// 		state.error = undefined;
	// 		state.isLoading = true;
	// 	});
	// 	builder.addCase(fetchAlbumDescription.fulfilled, (state, action) => {
	// 		state.isLoading = false;
	// 		const { isEditable, ...data } = action.payload;
	// 		state.data = data;
	// 		state.isEditable = !!isEditable;
	// 		state.form = action.payload;
	// 	});
	// 	builder.addCase(fetchAlbumDescription.rejected, (state, action) => {
	// 		state.isLoading = false;
	// 		state.error = action.payload;
	// 	});
	//
	// 	builder.addCase(updateAlbumDescription.pending, (state) => {
	// 		state.error = undefined;
	// 		state.serverMessage = undefined;
	// 		state.isLoading = true;
	// 	});
	// 	builder.addCase(updateAlbumDescription.fulfilled, (state, action) => {
	// 		state.isLoading = false;
	// 		state.serverMessage = action.payload.serverMessage;
	// 		state.data = state.form;
	// 	});
	// 	builder.addCase(updateAlbumDescription.rejected, (state, action) => {
	// 		state.isLoading = false;
	// 		state.error = action.payload;
	// 	});
	//
	// 	builder.addCase(deleteAlbum.pending, (state) => {
	// 		state.error = undefined;
	// 		state.serverMessage = undefined;
	// 		state.isLoading = true;
	// 	});
	// 	builder.addCase(deleteAlbum.fulfilled, (state, action) => {
	// 		state.isLoading = false;
	// 		state.serverMessage = action.payload;
	// 	});
	// 	builder.addCase(deleteAlbum.rejected, (state, action) => {
	// 		state.isLoading = false;
	// 		state.error = action.payload;
	// 	});
	// }
});

export const { actions: albumDescriptionFormActions } = albumDescriptionFormSlice;
export const { reducer: albumDescriptionFormReducer } = albumDescriptionFormSlice;
