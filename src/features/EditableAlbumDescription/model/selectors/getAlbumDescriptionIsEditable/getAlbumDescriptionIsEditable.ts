import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumDescriptionIsEditable = (state: StateSchema) => (state.albumDescription?.isEditable || false);