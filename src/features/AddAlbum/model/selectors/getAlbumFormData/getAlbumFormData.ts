import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumFormData = (state: StateSchema) => (state.albumForm?.data);
