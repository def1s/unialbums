import { Album } from 'entities/AlbumCard';

export interface AddAlbumSchema extends Omit<Album, 'albumId'> {
	// year: number;
}
