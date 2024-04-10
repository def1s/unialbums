import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumFormTextRating = (state: StateSchema) => (state?.albumForm?.textRating || 1);
