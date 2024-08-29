import { Album } from 'entities/Albums';
import { SearchFieldItem } from 'entities/SearchAlbums';

export type AlbumForm = Omit<Album, 'albumId'>;

export interface AlbumFormSchema {
	data: AlbumForm;
	searchAlbums?: SearchFieldItem[];
	isSearching: boolean;
	isLoading: boolean;
	error?: string;
	serverMessage?: string;
}
