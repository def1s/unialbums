import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumDescriptionFormData = (state: StateSchema) => state.albumDescriptionForm?.data;
