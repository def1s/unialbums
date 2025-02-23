import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';

interface ISell {

}

export const fetchSells = async (): Promise<ISell[]> => {
	const response = await axiosInstance.get<ApiResponse<ISell[]>>(
		`${__API_URL__}/sells`
	);

	return response.data.data;
};