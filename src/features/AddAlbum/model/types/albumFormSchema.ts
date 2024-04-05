import { Album } from 'entities/AlbumCard';

export interface AlbumFormSchema extends Omit<Album, 'albumId'> {
	// year: number;
}

export type AlbumFormFields = keyof AlbumFormSchema;
