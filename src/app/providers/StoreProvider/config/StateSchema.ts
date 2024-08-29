import { Action, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { HomePageSchema } from 'pages/HomePage';
import { AlbumFormSchema } from 'features/AddAlbum';
import { LoginSchema } from 'features/AuthByUsername';
import { EditableUserProfileSchema } from 'features/EditableUserProfile';
import { AlbumDescriptionFormSchema } from 'features/EditAlbumDescription';
import { RegistrationSchema } from 'features/RegistrationByUsername';
import { AlbumDescriptionSchema } from 'entities/Albums/AlbumDescription';
import { UserSchema } from 'entities/User';
// import { EditableAlbumRatingSchema } from 'features/EditableAlbumRating';

export interface StateSchema {
	user: UserSchema;
	homePage: HomePageSchema;

	// асинхронные редьюсеры
	loginForm?: LoginSchema;
	albumForm?: AlbumFormSchema;
	profile?: EditableUserProfileSchema;
	registrationForm?: RegistrationSchema;
	albumDescription?: AlbumDescriptionSchema;
	// albumRating?: EditableAlbumRatingSchema;
	albumDescriptionForm?: AlbumDescriptionFormSchema;
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
