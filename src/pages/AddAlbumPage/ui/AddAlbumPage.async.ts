import { lazy } from 'react';

export const AddAlbumPageAsync = lazy(
	() => import('./AddAlbumPage')
);
