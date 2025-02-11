import { useEffect, useState } from 'react';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { IAlbum } from 'shared/types';


export const fetchAlbumsInCart = async (): Promise<IAlbum[]> => {
	const response = await axiosInstance.get<ApiResponse<IAlbum[]>>(
		`${__API_URL__}/cart`
	);

	return response.data.data ?? [];
};

export const fetchAddAlbumToCart = async (albumId: string): Promise<boolean> => {
	const response = await axiosInstance.post<ApiResponse<IAlbum>>(
		`${__API_URL__}/cart`,
		{ albumId }
	);

	return response.status < 300;
};

export const fetchDeleteAlbumFromCart = async (albumId: string): Promise<boolean> => {
	const response = await axiosInstance.delete<ApiResponse<IAlbum>>(
		`${__API_URL__}/cart/${albumId}`,
	);

	return response.status < 300;
};

export const useAlbumsCart = (albumId: string) => {
	const [isInCart, setIsInCart] = useState<boolean>(false);
	const [cartContent, setCartContent] = useState<IAlbum[]>([]);

	useEffect(() => {
		fetchAlbumsInCart().then((albums) => {
			setCartContent(albums);
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			const res = !!albums.find(al => al.albumId == albumId);
			setIsInCart(res);
		});
	}, [albumId]);

	const AddToCart = async () => {
		fetchAddAlbumToCart(albumId).then(() => {
			setIsInCart(true);
			fetchAlbumsInCart().then((albums) => {
				setCartContent(albums);
			});
		});
	};

	const RemoveFromCart = async () => {
		fetchDeleteAlbumFromCart(albumId).then(() => {
			setIsInCart(false);
			fetchAlbumsInCart().then((albums) => {
				setCartContent(albums);
			});
		});
	};

	return { isInCart, cartContent, AddToCart, RemoveFromCart };
};
