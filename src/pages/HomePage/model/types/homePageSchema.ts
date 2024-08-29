import { IAlbum } from 'entities/Albums';

export interface HomePageSchema {
	albums: IAlbum[];
	isLoading: boolean;
	error?: string;
}
