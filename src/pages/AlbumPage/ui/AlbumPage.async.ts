import { lazy } from 'react';

export const AlbumPageAsync = lazy(
	() => import('./AlbumPage')
);
