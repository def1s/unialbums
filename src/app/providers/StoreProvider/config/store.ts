import { configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { userReducer } from 'entities/User';
import { createReducerManager } from './reducerManager';
import { homePageReducer } from 'pages/HomePage';

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

export type AppDispatch =  ReturnType<typeof configureReduxStore>['dispatch'];
