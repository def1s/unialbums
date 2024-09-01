import { IAlbumRating } from 'shared/types';

export interface AlbumRatingSchema {
	ratings: IAlbumRating;
	isLoading: boolean;
	error?: string;
}