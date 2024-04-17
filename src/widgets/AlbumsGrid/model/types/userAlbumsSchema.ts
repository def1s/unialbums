import { Album } from 'entities/Albums';

export interface UserAlbumsSchema {
	albums: Album[];
	isLoading: boolean;
	error?: string;
}
