import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumDescriptionData = (state: StateSchema) => (state.albumDescription?.data);

export const getAlbumDescriptionError = (state: StateSchema) => (state.albumDescription?.error);

export const getAlbumDescriptionForm = (state: StateSchema) => (state.albumDescription?.form);

export const getAlbumDescriptionIsEditable = (state: StateSchema) => (state.albumDescription?.isEditable || false);

export const getAlbumDescriptionIsLoading = (state: StateSchema) => (state.albumDescription?.isLoading || false);

export const getAlbumDescriptionReadonly = (state: StateSchema) => (state.albumDescription?.readonly);

export const getAlbumDescriptionServerMessage = (state: StateSchema) => (state.albumDescription?.serverMessage);
