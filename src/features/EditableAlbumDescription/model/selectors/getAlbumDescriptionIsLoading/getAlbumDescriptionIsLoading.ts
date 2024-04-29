import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumDescriptionIsLoading = (state: StateSchema) => (state.albumDescription?.isLoading || false);
