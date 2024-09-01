import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProfile } from 'shared/types';
import {
	updatePersonalProfileData
} from '../services/updatePersonalProfileData/updatePersonalProfileData';
import { PersonalProfileFormSchema } from '../types/personalProfileFormSchema';

const initialState: PersonalProfileFormSchema = {
	form: {
		avatar: '',
		firstName: '',
		lastName: '',
		username: ''
	},
	isLoading: false
};

const personalProfileFormSlice = createSlice({
	name: 'personalProfileForm',
	initialState,
	reducers: {
		initPersonalProfileForm: (state, action: PayloadAction<IProfile>) => {
			state.form = {
				...action.payload
			};
		},
		updatePersonalProfileForm: (state, action: PayloadAction<IProfile>) => {
			state.form = {
				...state.form,
				...action.payload
			};
		}
	},
	extraReducers: builder => {
		builder.addCase(updatePersonalProfileData.pending, (state) => {
			state.error = undefined;
			state.isLoading = true;
		});
		builder.addCase(updatePersonalProfileData.fulfilled, (state) => {
			state.isLoading = false;
		});
		builder.addCase(updatePersonalProfileData.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
	}
});

export const { actions: personalProfileFormActions } = personalProfileFormSlice;
export const { reducer: personalProfileFormReducer } = personalProfileFormSlice;
