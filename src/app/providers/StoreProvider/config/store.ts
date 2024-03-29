import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { userReducer } from 'entities/User';
import { loginReducer } from 'features/AuthByUsername';

export const configureReduxStore = () => {
	const rootReducers: ReducersMapObject<StateSchema> = {
		user: userReducer,
		login: loginReducer
	};

	return configureStore<StateSchema>({
		reducer: rootReducers,
		devTools: __IS_DEV__
	});
};
