import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumDescriptionForm = (state: StateSchema) => (state.albumDescription?.form);
