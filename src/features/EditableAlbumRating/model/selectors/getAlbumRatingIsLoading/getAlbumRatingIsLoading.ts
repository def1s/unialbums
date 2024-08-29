import { StateSchema } from 'app/providers/StoreProvider';

export const getAlbumRatingIsLoading = (state: StateSchema) => (state.albumRating?.isLoading || false);