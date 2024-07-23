import { IAlbumRating } from 'entities/Albums';

export interface EditableAlbumRatingSchema {
	data?: IAlbumRating;
	// form?
	isLoading: boolean;
	error?: string;
	readonly: boolean;
	isEditable: boolean;
	serverMessage?: string;
}