import { StateSchema } from 'app/providers/StoreProvider';

export const getPersonalProfileFormForm = (state: StateSchema) => state.personalProfileForm?.form;

export const getPersonalProfileFormIsLoading = (state: StateSchema) => state.personalProfileForm?.isLoading;

export const getPersonalProfileFormError = (state: StateSchema) => state.personalProfileForm?.error;