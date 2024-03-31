export interface ApiResponse<T> {
	data: T;
	message: string;
	code: number;
}

export type token = {
	access_token: string;
}
