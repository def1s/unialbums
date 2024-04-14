import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumFormTracksRating = (state: StateSchema) => (state?.albumForm?.tracksRating || 1);
