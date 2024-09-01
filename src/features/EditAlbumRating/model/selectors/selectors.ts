import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumRatingFormRating = (state: StateSchema) => state.albumRatingForm?.ratings;

export const getAlbumRatingFormIsLoading = (state: StateSchema) => state.albumRatingForm?.isLoading;