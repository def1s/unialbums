import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAlbumDescriptionForm } from 'shared/types';
import {
	updateAlbumDescription
} from '../services/updateAlbumDescription/updateAlbumDescription';
import { AlbumDescriptionFormSchema } from '../types/albumDescriptionFormSchema';

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
		}
	},
	extraReducers: builder => {
		builder.addCase(updateAlbumDescription.pending, (state) => {
			state.error = undefined;
			state.isLoading = true;
		});
		builder.addCase(updateAlbumDescription.fulfilled, (state) => {
			state.isLoading = false;
		});
		builder.addCase(updateAlbumDescription.rejected, (state) => {
			state.isLoading = false;
		});
	}
});

export const { actions: albumDescriptionFormActions } = albumDescriptionFormSlice;
export const { reducer: albumDescriptionFormReducer } = albumDescriptionFormSlice;
