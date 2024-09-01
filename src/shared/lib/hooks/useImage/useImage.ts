import { ChangeEvent, useRef } from 'react';

/**
 * Хук для работы с изображениями. Позволяет получить ссылку на изображение, которую можно хранить в Redux хранилище.
 *
 * @returns {Object} Объект, содержащий локальный URL изображения и функции для создания и удаления изображения.
 * @returns {React.MutableRefObject<string>} localUrlImage - Ссылка на локальный URL изображения.
 * @returns {Function} onCreateImage - Функция для создания локального URL изображения.
 * @returns {Function} onDeleteImage - Функция для удаления локального URL изображения.
 */
export const useImage = () => {
	const localUrlImage = useRef<string>('');

	/**
	 * Создает локальный URL для выбранного изображения.
	 *
	 * @param {ChangeEvent<HTMLInputElement>} e - Событие изменения input файла.
	 */
	const onCreateImage = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const { files } = e.target;

		if (files) {
			localUrlImage.current = window.URL.createObjectURL(files[0]);
		}
	};

	/**
	 * Удаляет локальный URL изображения.
	 */
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
