import { StateSchema } from 'app/providers/StoreProvider';

export const getRegistrationFirstName = (state: StateSchema) => (state.registrationForm?.firstName || '');
