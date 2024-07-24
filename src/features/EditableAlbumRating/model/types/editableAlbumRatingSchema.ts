import { IAlbumRating } from 'entities/Albums';

export interface EditableAlbumRatingSchema {
	data?: IAlbumRating;
	ratingSliders?: IAlbumRating;
	isLoading: boolean;
	error?: string;
	readonly: boolean;
	isEditable: boolean;
	serverMessage?: string;
}