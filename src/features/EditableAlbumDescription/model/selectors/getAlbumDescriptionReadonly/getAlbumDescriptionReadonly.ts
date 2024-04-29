import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumDescriptionReadonly = (state: StateSchema) => (state.albumDescription?.readonly);
