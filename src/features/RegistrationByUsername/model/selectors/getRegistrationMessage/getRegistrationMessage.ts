import { StateSchema } from 'app/providers/StoreProvider';

export const getRegistrationMessage = (state: StateSchema) => (state.registrationForm?.message || '');
