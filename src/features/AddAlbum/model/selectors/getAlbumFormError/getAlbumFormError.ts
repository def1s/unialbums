import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumFormError = (state: StateSchema) => (state?.albumForm?.error);
