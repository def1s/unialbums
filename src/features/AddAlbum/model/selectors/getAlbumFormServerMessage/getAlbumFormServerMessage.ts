import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumFormServerMessage = (state: StateSchema) => (state.albumForm?.serverMessage);
