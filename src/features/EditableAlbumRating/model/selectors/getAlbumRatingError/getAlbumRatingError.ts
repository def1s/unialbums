import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumRatingError = (state: StateSchema) => (state.albumRating?.error);