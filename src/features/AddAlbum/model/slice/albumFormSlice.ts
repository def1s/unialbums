import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlbumFormSchema } from '../types/albumFormSchema';
import { addAlbumToUser } from '../services/addAlbumToUser/addAlbumToUser';

const initialState: AlbumFormSchema = {
	cover: '',
	// year: 2000,
	title: '',
	artist: '',
	atmosphereRating: 1,
	textRating: 1,
	tracksRating: 1,
	bitsRating: 1,
	isLoading: false
};

const albumFormSlice = createSlice({
	name: 'albumForm',
	initialState,
	reducers: {
		setFieldValue: (state, action: PayloadAction<{ field: string; value: string | number }>) => {
			const { field, value } = action.payload;
			// eslint-disable-next-line
			// @ts-expect-error
			state[field] = value;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(addAlbumToUser.pending, (state) => {
			state.error = undefined;
			state.message = undefined;
			state.isLoading = true;
		});

		builder.addCase(addAlbumToUser.fulfilled, (state, action) => {
			state.isLoading = false;
			state.message = action.payload.message;
		});

		builder.addCase(addAlbumToUser.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
	}
});

export const { actions: albumFormActions } = albumFormSlice;
export const { reducer: albumFormReducer } = albumFormSlice;
