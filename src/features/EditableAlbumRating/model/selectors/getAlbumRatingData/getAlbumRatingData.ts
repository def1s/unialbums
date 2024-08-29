import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumRatingData = (state: StateSchema) => (state.albumRating?.data);