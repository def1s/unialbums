import { StateSchema } from 'app/providers/StoreProvider';

export const getRegistrationPassword = (state: StateSchema) => (state.registrationForm?.password || '');
