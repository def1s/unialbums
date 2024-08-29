import { IAlbumDescription } from 'entities/Albums';

export type IAlbumDescriptionForm = Omit<IAlbumDescription, 'isEditable'>;

export interface AlbumDescriptionFormSchema {
	data: IAlbumDescriptionForm;
	isLoading: boolean;
	error?: string;
}