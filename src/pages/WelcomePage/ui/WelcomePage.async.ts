import { lazy } from 'react';

export const WelcomePageAsync = lazy(
	() => import('./WelcomePage')
);
