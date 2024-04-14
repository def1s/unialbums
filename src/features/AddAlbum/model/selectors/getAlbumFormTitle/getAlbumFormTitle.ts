import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumFormTitle = (state: StateSchema) => (state?.albumForm?.title || '');
