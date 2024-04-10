import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumFormBitsRating = (state: StateSchema) => (state?.albumForm?.bitsRating || 1);
