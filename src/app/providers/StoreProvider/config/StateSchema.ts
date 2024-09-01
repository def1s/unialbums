import { Action, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { AlbumFormSchema } from 'features/AddAlbum';
import { LoginSchema } from 'features/AuthByUsername';
import { AlbumDescriptionFormSchema } from 'features/EditAlbumDescription';
import { AlbumRatingFormSchema } from 'features/EditAlbumRating';
import { PersonalProfileFormSchema } from 'features/EditPersonalProfile';
import { RegistrationSchema } from 'features/RegistrationByUsername';
import { AlbumDescriptionSchema } from 'entities/Albums/AlbumDescription';
import { AlbumRatingSchema } from 'entities/Albums/AlbumRating';
import { AlbumsGridSchema } from 'entities/Albums/AlbumsGrid';
import { NotificationSchema } from 'entities/Notification';
import { PersonalProfileSchema } from 'entities/PersonalProfile';
import { UserSchema } from 'entities/User';

export interface StateSchema {
	user: UserSchema;
	notification: NotificationSchema;

	// асинхронные редьюсеры
	loginForm?: LoginSchema;
	albumForm?: AlbumFormSchema;
	registrationForm?: RegistrationSchema;

	albumDescription?: AlbumDescriptionSchema;
	albumDescriptionForm?: AlbumDescriptionFormSchema;

	albumsGrid?: AlbumsGridSchema;

	personalProfile?: PersonalProfileSchema;
	personalProfileForm?: PersonalProfileFormSchema
	
	albumRating?: AlbumRatingSchema;
	albumRatingForm?: AlbumRatingFormSchema;
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
