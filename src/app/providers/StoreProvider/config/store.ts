import { configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { homePageReducer } from 'pages/HomePage';
import { userReducer } from 'entities/User';
import { createReducerManager } from './reducerManager';
import { StateSchema } from './StateSchema';

export const configureReduxStore = (
	initialState?: StateSchema,
	asyncReducers?: ReducersMapObject<StateSchema>
) => {
	const rootReducers: ReducersMapObject<StateSchema> = {
		...asyncReducers,
		user: userReducer,
		homePage: homePageReducer
	};

	const reducerManager = createReducerManager(rootReducers);

	const store = configureStore<StateSchema>({
		reducer: reducerManager.reduce as Reducer<StateSchema>,
		devTools: __IS_DEV__,
		preloadedState: initialState
	});

	// eslint-disable-next-line
	// @ts-expect-error
	store.reducerManager = reducerManager;

	return store;
};

export type AppDispatch = ReturnType<typeof configureReduxStore>['dispatch'];
