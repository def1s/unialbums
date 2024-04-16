import { Album } from 'entities/AlbumCard';

export type AlbumForm = Omit<Album, 'albumId'>;

export interface AlbumFormSchema extends AlbumForm {
	isLoading: boolean;
	error?: string;
	message?: string;
}

export type AlbumFormFields = keyof AlbumFormSchema;
