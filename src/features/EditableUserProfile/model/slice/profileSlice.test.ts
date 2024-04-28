import { profileReducer, profileActions } from './profileSlice';
import { Profile } from 'entities/Profile';
import { EditableUserProfileSchema } from '../types/editableUserProfileSchema';

describe('profile reducer', () => {
	test('should handle setReadonly', () => {
		const initialState: EditableUserProfileSchema = { isLoading: false, readonly: true };
		const newState = profileReducer(initialState, profileActions.setReadonly(false));
		expect(newState.readonly).toBe(false);
	});

	test('should handle updateProfile', () => {
		const initialState: EditableUserProfileSchema = { isLoading: false, readonly: true };
		const profileData: Profile = { username: 'testuser' };
		const newState = profileReducer(initialState, profileActions.updateProfile(profileData));
		expect(newState.form).toEqual(profileData);
	});

	test('should handle resetForm', () => {
		const initialState: EditableUserProfileSchema = { isLoading: false, readonly: true, form: { username: 'testuser' } };
		const newState = profileReducer(initialState, profileActions.resetForm());
		expect(newState.form).toEqual(initialState.data);
	});
});
