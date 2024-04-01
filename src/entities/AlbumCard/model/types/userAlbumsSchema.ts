export interface Album {
	albumId: number;
	cover: string;
	title: string;
	artist: string;
	bitsRating?: number;
	textRating?: number;
	tracksRating?: number;
	atmosphereRating?: number;
}

export interface UserAlbumsSchema {
	albums: Album[];
	isLoading: boolean;
	error?: string;
}
