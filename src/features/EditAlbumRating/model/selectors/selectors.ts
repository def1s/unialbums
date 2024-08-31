import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumRatingFormRating = (state: StateSchema) => state.albumRatingForm?.ratings;