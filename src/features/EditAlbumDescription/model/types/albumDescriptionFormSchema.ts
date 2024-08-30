import { IAlbumDescriptionForm } from 'shared/types';

export interface AlbumDescriptionFormSchema {
	data: IAlbumDescriptionForm;
	isLoading: boolean;
	// TODO ошибка используется в другом ключе, изменить на boolean и поменять в async thunk
	error?: string;
}