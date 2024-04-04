import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { userReducer } from 'entities/User';
import { loginReducer } from 'features/AuthByUsername';
import { userAlbumsReducer } from 'widgets/AlbumsGrid';

export const configureReduxStore = (initialState?: StateSchema) => {
	const rootReducers: ReducersMapObject<StateSchema> = {
		user: userReducer,
		loginForm: loginReducer,
		userAlbums: userAlbumsReducer
	};

	return configureStore<StateSchema>({
		reducer: rootReducers,
		devTools: __IS_DEV__,
		preloadedState: initialState
	});
};
