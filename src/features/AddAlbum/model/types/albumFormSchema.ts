import { SearchFieldItem } from 'entities/SearchAlbums';
import { IAlbumForm } from 'shared/types';

export interface AlbumFormSchema {
	data: IAlbumForm;
	searchAlbums?: SearchFieldItem[];
	isSearching: boolean;
	isLoading: boolean;
	error?: string;
	serverMessage?: string;
}
