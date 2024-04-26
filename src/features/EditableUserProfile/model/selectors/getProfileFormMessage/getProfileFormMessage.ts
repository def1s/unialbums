import { StateSchema } from 'app/providers/StoreProvider';

export const getProfileFormMessage = (state: StateSchema) => (state.profile?.message);
