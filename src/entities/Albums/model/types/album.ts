export interface IAlbumDescription {
	isEditable?: boolean;
	cover?: string;
	title?: string;
	artist?: string;
}

export interface IAlbumRating {
	isEditable?: boolean;
	bitsRating?: number;
	textRating?: number;
	tracksRating?: number;
	atmosphereRating?: number;
	totalRating?: number;
}

export interface AlbumBase {
	albumId?: number;
}

export interface Album extends IAlbumDescription, IAlbumRating, AlbumBase {}
