import { Album } from 'entities/AlbumCard';

export interface AlbumFormSchema extends Omit<Album, 'albumId'> {
	// year: number;
	isLoading: boolean;
	error?: string;
}

export type AlbumFormFields = keyof AlbumFormSchema;
