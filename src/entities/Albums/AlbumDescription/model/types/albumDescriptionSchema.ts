import { IAlbumDescription } from 'shared/types';

export interface AlbumDescriptionSchema {
	data?: IAlbumDescription;
	isLoading: boolean;
	error?: string;
	readonly: boolean;
	isEditable: boolean;
	serverMessage?: string;
}
