import { IProfile } from 'shared/types';

export interface PersonalProfileFormSchema {
	form: IProfile;
	isLoading: boolean;
	// TODO ошибка используется в другом ключе, изменить на boolean и поменять в async thunk
	error?: string;
}