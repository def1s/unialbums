import { StateSchema } from 'app/providers/StoreProvider';

export const getRegistrationIsPasswordsEqual = (state: StateSchema) => (state.registrationForm?.isPasswordsEqual);
