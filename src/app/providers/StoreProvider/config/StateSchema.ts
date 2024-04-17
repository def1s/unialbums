import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';
import { UserAlbumsSchema } from 'widgets/AlbumsGrid';
import { AlbumFormSchema } from 'features/AddAlbum';
import { EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { ProfileSchema } from 'entities/Profile/model/types/profile';

export interface StateSchema {
	user: UserSchema;
	loginForm?: LoginSchema;
	userAlbums: UserAlbumsSchema;
	albumForm?: AlbumFormSchema;
	profile?: ProfileSchema
}

export type StateSchemaKey = keyof StateSchema;

// описание того, что возвращает reducer manager
export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<StateSchema>;
	reduce: Reducer<StateSchema>;
	add: (key: StateSchemaKey, reducer: Reducer) => void;
	remove: (key: StateSchemaKey) => void;
}

// расширение стандартных полей store
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
	reducerManager: ReducerManager
}
