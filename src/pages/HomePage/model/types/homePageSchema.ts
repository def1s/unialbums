import { IAlbum } from 'shared/types';

export interface HomePageSchema {
	albums: IAlbum[];
	isLoading: boolean;
	error?: string;
}
