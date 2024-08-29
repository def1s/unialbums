import { StateSchema } from 'app/providers/StoreProvider';

export const getSearchIsLoading = (state: StateSchema) => (state.albumForm?.isSearching);