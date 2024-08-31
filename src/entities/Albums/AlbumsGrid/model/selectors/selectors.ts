import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumsGridAlbums = (state: StateSchema) => state.albumsGrid?.albums;

export const getAlbumsGridIsLoading = (state: StateSchema) => state.albumsGrid?.isLoading;

export const getAlbumsGridError = (state: StateSchema) => state.albumsGrid?.error;