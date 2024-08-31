import { StateSchema } from 'app/providers/StoreProvider';

export const getPersonalProfileError = (state: StateSchema) => (state?.personalProfile?.error);
