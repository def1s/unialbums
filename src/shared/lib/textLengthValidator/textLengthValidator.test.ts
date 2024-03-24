import { textLengthValidation } from './textLengthValidator';

describe('textLengthValidation', () => {
	test('should truncate text that exceeds the maximum length', () => {
		const text = 'This is a very long text that exceeds the maximum length';
		const result = textLengthValidation(text, 20);
		expect(result).toBe('This is a very long t...');
	});

	test('should return the original text if it does not exceed the maximum length', () => {
		const text = 'Short text';
		const result = textLengthValidation(text, 20);
		expect(result).toBe('Short text');
	});

	test('should return "Неизвестно" for empty text', () => {
		const text = '';
		const result = textLengthValidation(text, 20);
		expect(result).toBe('Неизвестно');
	});

	test('should handle text with length exactly equal to the maximum length', () => {
		const text = 'This is exactly 20';
		const result = textLengthValidation(text, 20);
		expect(result).toBe('This is exactly 20');
	});
});
