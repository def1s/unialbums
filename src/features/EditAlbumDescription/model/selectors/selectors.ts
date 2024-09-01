import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumDescriptionFormData = (state: StateSchema) => state.albumDescriptionForm?.data;

export const getAlbumDescriptionFormIsLoading = (state: StateSchema) => state.albumDescriptionForm?.isLoading || false;

export const getAlbumDescriptionFormError = (state: StateSchema) => state.albumDescriptionForm?.error;
