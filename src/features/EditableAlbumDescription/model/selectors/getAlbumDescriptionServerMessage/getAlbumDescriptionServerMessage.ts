import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumDescriptionServerMessage = (state: StateSchema) => (state.albumDescription?.serverMessage);
