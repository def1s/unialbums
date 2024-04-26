export interface ProfileFieldType {
	label: string;
	value: string | number;
	fieldName: ProfileKey;
}

export interface Profile {
	firstName?: string;
	lastName?: string;
	username?: string;
	avatar?: string;
}

export type ProfileKey = keyof Profile;
