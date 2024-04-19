import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';
import { AlbumFormSchema } from 'features/AddAlbum';
import { Action, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { ProfileSchema } from 'entities/Profile/model/types/profile';
import { HomePageSchema } from 'pages/HomePage/model/types/homePageSchema';

export interface StateSchema {
	user: UserSchema;
	homePage: HomePageSchema;

	// асинхронные редьюсеры
	loginForm?: LoginSchema;
	albumForm?: AlbumFormSchema;
	profile?: ProfileSchema
}

export type StateSchemaKey = keyof StateSchema;

// описание того, что возвращает reducer manager
export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<StateSchema>;
	reduce: (state: StateSchema, action: Action) => StateSchema;
	add: (key: StateSchemaKey, reducer: Reducer) => void;
	remove: (key: StateSchemaKey) => void;
}

// расширение стандартных полей store
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
	reducerManager: ReducerManager
}
