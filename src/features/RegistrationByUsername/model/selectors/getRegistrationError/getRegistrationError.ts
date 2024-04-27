import { StateSchema } from 'app/providers/StoreProvider';

export const getRegistrationError = (state: StateSchema) => (state.registrationForm?.error);
