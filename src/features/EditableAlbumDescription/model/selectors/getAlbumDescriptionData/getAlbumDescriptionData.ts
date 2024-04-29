import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumDescriptionData = (state: StateSchema) => (state.albumDescription?.data);
