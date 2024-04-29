import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';
import { AlbumFormSchema } from 'features/AddAlbum';
import { Action, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { HomePageSchema } from 'pages/HomePage';
import { EditableUserProfileSchema } from 'features/EditableUserProfile';
import { RegistrationSchema } from 'features/RegistrationByUsername';
import {
	EditableAlbumDescriptionSchema
} from 'features/EditableAlbumDescription';

export interface StateSchema {
	user: UserSchema;
	homePage: HomePageSchema;

	// асинхронные редьюсеры
	loginForm?: LoginSchema;
	albumForm?: AlbumFormSchema;
	profile?: EditableUserProfileSchema;
	registrationForm?: RegistrationSchema;
	albumDescription?: EditableAlbumDescriptionSchema
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
