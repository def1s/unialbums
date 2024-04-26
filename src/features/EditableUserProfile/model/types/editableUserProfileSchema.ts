import { Profile } from 'entities/Profile/model/types/profile';

export interface EditableUserProfileSchema {
	data?: Profile;
	form?: Profile;
	isLoading: boolean;
	error?: string;
	readonly: boolean;
}
