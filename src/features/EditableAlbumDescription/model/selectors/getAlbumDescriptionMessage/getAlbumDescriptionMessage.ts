import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumDescriptionMessage = (state: StateSchema) => (state.albumDescription?.message);
