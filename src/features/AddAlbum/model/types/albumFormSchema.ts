import { Album } from 'entities/Albums';

export type AlbumForm = Omit<Album, 'albumId'>;

export interface AlbumFormSchema {
	data: AlbumForm;
	isLoading: boolean;
	error?: string;
	message?: string;
}

export type AlbumFormKey = keyof AlbumForm;
