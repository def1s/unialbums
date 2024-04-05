import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';
import { UserAlbumsSchema } from 'widgets/AlbumsGrid';
import { AddAlbumSchema } from 'features/AddAlbum';

export interface StateSchema {
	user: UserSchema;
	loginForm?: LoginSchema;
	userAlbums: UserAlbumsSchema;
	addAlbum?: AddAlbumSchema;
}
