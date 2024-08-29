// TODO изменить струтуру данных, обязательный массив и сделать его опциональным
export interface ApiResponse<T> {
	data: T;
	message: string;
}

export type token = {
	accessToken: string;
}
