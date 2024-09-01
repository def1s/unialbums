import { StateSchema } from 'app/providers/StoreProvider';

export const getRegistrationValidateErrors = (state: StateSchema) => (state.registrationForm?.validateErrors);
