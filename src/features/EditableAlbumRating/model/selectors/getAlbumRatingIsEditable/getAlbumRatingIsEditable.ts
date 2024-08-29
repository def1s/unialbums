import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumRatingIsEditable = (state: StateSchema) => (state.albumRating?.isEditable || false);