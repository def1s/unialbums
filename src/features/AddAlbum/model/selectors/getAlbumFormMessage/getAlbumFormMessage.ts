import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumFormMessage = (state: StateSchema) => (state?.albumForm?.message);
