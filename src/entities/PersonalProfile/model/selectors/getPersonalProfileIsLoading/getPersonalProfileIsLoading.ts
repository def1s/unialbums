import { StateSchema } from 'app/providers/StoreProvider';

export const getPersonalProfileIsLoading = (state: StateSchema) => (state?.personalProfile?.isLoading || false);
