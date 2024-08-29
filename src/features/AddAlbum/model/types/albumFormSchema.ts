import { IAlbum } from 'entities/Albums';
import { SearchFieldItem } from 'entities/SearchAlbums';

export type AlbumForm = Omit<IAlbum, 'albumId'>;

export interface AlbumFormSchema {
	data: AlbumForm;
	searchAlbums?: SearchFieldItem[];
	isSearching: boolean;
	isLoading: boolean;
	error?: string;
	serverMessage?: string;
}
