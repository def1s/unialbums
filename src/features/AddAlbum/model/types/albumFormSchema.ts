import { Album } from 'entities/Albums';

export type AlbumForm = Omit<Album, 'albumId'>;

export interface AlbumFormSchema extends AlbumForm {
	isLoading: boolean;
	error?: string;
	message?: string;
}

export type AlbumFormFields = Exclude<keyof AlbumFormSchema, undefined>;
