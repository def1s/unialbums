import { IAlbum } from 'shared/types';

export interface AlbumsGridSchema {
	albums: IAlbum[];
	isLoading: boolean;
	error?: string;
}