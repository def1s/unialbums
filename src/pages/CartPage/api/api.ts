import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';

export const fetchOrderCart = async (): Promise<boolean> => {
	const response = await axiosInstance.post<ApiResponse<boolean>>(
		`${__API_URL__}/cart/confirm`
	);

	return response.status < 300;
};