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

export interface IAlbumBase {
	albumId?: number;
}

export interface IAlbum extends IAlbumDescription, IAlbumRating, IAlbumBase {}

