import { StateSchema } from 'app/providers/StoreProvider';

export const getUserAlbumsState = (state: StateSchema) => (state.userAlbums);
