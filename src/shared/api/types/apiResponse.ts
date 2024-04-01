export interface ApiResponse<T> {
	data: T[];
	message: string;
}

export type token = {
	accessToken: string;
}
