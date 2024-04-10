import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumFormAtmosphereRating = (state: StateSchema) => (state?.albumForm?.atmosphereRating || 1);
