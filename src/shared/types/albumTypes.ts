export interface IAlbumDescription {
	isEditable?: boolean;
	cover?: string;
	title?: string;
	artist?: string;
	price?: number;
	isSold?: boolean;
}

export type IAlbumDescriptionForm = Omit<IAlbumDescription, 'isEditable'>;

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

export type IAlbumForm = Omit<IAlbum, 'albumId'>;

