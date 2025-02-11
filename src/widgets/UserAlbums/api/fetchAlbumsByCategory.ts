import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { IAlbum } from 'shared/types';


export const fetchAlbumsByCategory = async (category: string): Promise<IAlbum[]> => {
	const response = await axiosInstance.get<ApiResponse<IAlbum[]>>(`${__API_URL__}/albums/category/${category}`);

	return response.data.data ?? [];
};
