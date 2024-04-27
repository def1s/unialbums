import { StateSchema } from 'app/providers/StoreProvider';

export const getRegistrationIsLoading = (state: StateSchema) => (state.registrationForm?.isLoading || false);
