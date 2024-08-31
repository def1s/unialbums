import { IAlbumRating } from 'shared/types';

export interface AlbumRatingFormSchema {
	ratings: IAlbumRating;
	isLoading: boolean;
	error?: string;
}