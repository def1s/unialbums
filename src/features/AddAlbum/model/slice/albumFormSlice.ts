import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlbumFormFields, AlbumFormSchema } from '../types/albumFormSchema';

const initialState: AlbumFormSchema = {
	cover: '',
	// year: 2000,
	title: '',
	artist: '',
	atmosphereRating: 1,
	textRating: 1,
	tracksRating: 1,
	bitsRating: 1
};

const albumFormSlice = createSlice({
	name: 'albumForm',
	initialState,
	reducers: {
		setFieldValue: (state, action: PayloadAction<{ field: string; value: string | number }>) => {
			const { field, value } = action.payload;
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			state[field] = value;
		}
	},
	// extraReducers: (builder) => {
	// }
});

export const { actions: albumFormActions } = albumFormSlice;
export const { reducer: albumFormReducer } = albumFormSlice;
