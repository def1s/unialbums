import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { userReducer } from 'entities/User';
import { userAlbumsReducer } from 'widgets/AlbumsGrid';
import { createReducerManager } from './reducerManager';

export const configureReduxStore = (
	initialState?: StateSchema,
	asyncReducers?: ReducersMapObject<StateSchema>
) => {
	const rootReducers: ReducersMapObject<StateSchema> = {
		...asyncReducers,
		user: userReducer,
		userAlbums: userAlbumsReducer
	};

	const reducerManager = createReducerManager(rootReducers);

	const store = configureStore<StateSchema>({
		reducer: reducerManager.reduce,
		devTools: __IS_DEV__,
		preloadedState: initialState
	});

	// eslint-disable-next-line
	// @ts-expect-error
	store.reducerManager = reducerManager;

	return store;
};

export type AppDispatch =  ReturnType<typeof configureReduxStore>['dispatch'];
