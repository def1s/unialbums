import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumFormIsLoading = (state: StateSchema) => (state?.albumForm?.isLoading || false);
