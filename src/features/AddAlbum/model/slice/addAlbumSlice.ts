import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddAlbumSchema } from '../types/addAlbumSchema';

const initialState: AddAlbumSchema = {
	cover: '',
	// year: 2000,
	title: '',
	artist: '',
	atmosphereRating: 1
};

const addAlbumSlice = createSlice({
	name: 'addAlbum',
	initialState,
	reducers: {
		setTextRating: (state, action: PayloadAction<number>) => {
			state.textRating = action.payload;
		},
		setBitsRating: (state, action: PayloadAction<number>) => {
			state.bitsRating = action.payload;
		},
		setTracksRating: (state, action: PayloadAction<number>) => {
			state.tracksRating = action.payload;
		},
		setAtmosphereRating: (state, action: PayloadAction<number>) => {
			state.atmosphereRating = action.payload;
		}
	},
	// extraReducers: (builder) => {
	// 	builder.addCase(loginByUsername.pending, (state) => {
	// 		state.error = undefined;
	// 		state.isLoading = true;
	// 	});
	//
	// 	builder.addCase(loginByUsername.fulfilled, (state) => {
	// 		state.isLoading = false;
	// 	});
	//
	// 	builder.addCase(loginByUsername.rejected, (state, action) => {
	// 		state.isLoading = false;
	// 		state.error = action.payload;
	// 	});
	// }
});

export const { actions: addAlbumActions } = addAlbumSlice;
export const { reducer: addAlbumReducer } = addAlbumSlice;
