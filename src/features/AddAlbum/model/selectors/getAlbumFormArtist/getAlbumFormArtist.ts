import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumFormArtist = (state: StateSchema) => (state?.albumForm?.artist || '');
