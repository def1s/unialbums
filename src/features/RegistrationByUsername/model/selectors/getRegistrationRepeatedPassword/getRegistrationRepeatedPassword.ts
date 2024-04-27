import { StateSchema } from 'app/providers/StoreProvider';

export const getRegistrationRepeatedPassword = (state: StateSchema) => (state.registrationForm?.repeatedPassword || '');
