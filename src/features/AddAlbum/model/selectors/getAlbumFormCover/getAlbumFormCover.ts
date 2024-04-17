import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumFormCover = (state: StateSchema) => (state?.albumForm?.cover || '');
