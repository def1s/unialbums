import { StateSchema } from 'app/providers/StoreProvider';

export const getProfileFormServerMessage = (state: StateSchema) => (state.profile?.serverMessage);
