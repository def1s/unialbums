import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumRatingReadonly = (state: StateSchema) => (state.albumRating?.readonly);