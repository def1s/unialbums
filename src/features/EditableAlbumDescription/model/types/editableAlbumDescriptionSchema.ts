import { IAlbumDescription } from 'entities/Albums';

export interface EditableAlbumDescriptionSchema {
	data?: IAlbumDescription;
	form?: IAlbumDescription;
	isLoading: boolean;
	error?: string;
	readonly: boolean;
	isEditable: boolean;
	serverMessage?: string;
}
