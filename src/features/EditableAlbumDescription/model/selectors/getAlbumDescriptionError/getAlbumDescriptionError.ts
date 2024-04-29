import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumDescriptionError = (state: StateSchema) => (state.albumDescription?.error);
