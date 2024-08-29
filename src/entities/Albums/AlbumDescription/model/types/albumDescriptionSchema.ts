import { IAlbumDescription } from 'entities/Albums';

export interface AlbumDescriptionSchema {
	data?: IAlbumDescription;
	form?: IAlbumDescription;
	isLoading: boolean;
	error?: string;
	readonly: boolean;
	isEditable: boolean;
	serverMessage?: string;
}
