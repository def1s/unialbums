import { StateSchema } from 'app/providers/StoreProvider';

export const getPersonalProfileData = (state: StateSchema) => (state?.personalProfile?.data);
