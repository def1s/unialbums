import { Album } from 'entities/Albums';

export interface HomePageSchema {
	albums: Album[];
	isLoading: boolean;
	error?: string;
}
