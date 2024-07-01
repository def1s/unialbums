import { Album } from 'entities/Albums';

export interface EditableAlbumDescriptionSchema {
	data?: Album;
	form?: Album;
	isLoading: boolean;
	error?: string;
	readonly: boolean;
	serverMessage?: string;
}
