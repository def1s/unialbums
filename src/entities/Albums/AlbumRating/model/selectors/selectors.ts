import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumRatingRating = (state: StateSchema) => state.albumRating?.ratings;

export const getAlbumRatingIsLoading = (state: StateSchema) => state.albumRating?.isLoading;

export const getAlbumRatingError = (state: StateSchema) => state.albumRating?.error;