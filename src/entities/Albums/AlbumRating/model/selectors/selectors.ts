import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumRatingRating = (state: StateSchema) => state.albumRating?.ratings;