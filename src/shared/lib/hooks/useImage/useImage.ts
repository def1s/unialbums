import { ChangeEvent, useRef } from 'react';

export const useImage = () => {
	const localUrlImage = useRef('');

	const onCreateImage = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const { files } = e.target;

		if (files) {
			localUrlImage.current = window.URL.createObjectURL(files[0]);
		}
	};

	const onDeleteImage = () => {
		URL.revokeObjectURL(localUrlImage.current);
		localUrlImage.current = '';
	};

	return {
		localUrlImage,
		onCreateImage,
		onDeleteImage
	};
};
