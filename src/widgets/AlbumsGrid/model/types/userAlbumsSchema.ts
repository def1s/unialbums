import { Album } from 'entities/AlbumCard';

export interface UserAlbumsSchema {
	albums: Album[];
	isLoading: boolean;
	error?: string;
}
