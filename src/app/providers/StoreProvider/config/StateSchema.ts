import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';
import { UserAlbumsSchema } from 'widgets/AlbumsGrid';

export interface StateSchema {
	user: UserSchema;
	loginForm?: LoginSchema;
	userAlbums: UserAlbumsSchema;
}
