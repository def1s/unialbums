/**
 * Функция для валидации текста
 * @param {string} text - Текст для валидации
 * @param {number} maxLength - Максимальная длина текста
 * @returns {string} - Валидированный текст
 */
export const textLengthValidation = (text: string, maxLength: number = 15): string => {
	if (text.length > maxLength) {
		return text.slice(0, maxLength + 1) + '...';
	} else if (text.length === 0) {
		return 'Неизвестно';
	}
	return text;
};
