import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumRatingSliders = (state: StateSchema) => (state.albumRating?.ratingSliders);