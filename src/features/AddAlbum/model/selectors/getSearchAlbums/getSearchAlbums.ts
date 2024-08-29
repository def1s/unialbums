import { StateSchema } from 'app/providers/StoreProvider';

export const getSearchAlbums = (state: StateSchema) => (state.albumForm?.searchAlbums || []);