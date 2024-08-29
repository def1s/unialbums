import { IAlbumDescriptionForm } from 'shared/types';

export interface AlbumDescriptionFormSchema {
	data: IAlbumDescriptionForm;
	isLoading: boolean;
	error?: string;
	serverMessage?: string;
}