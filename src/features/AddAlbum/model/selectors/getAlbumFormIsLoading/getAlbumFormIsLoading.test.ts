import { getAlbumFormIsLoading } from './getAlbumFormIsLoading';
import { StateSchema } from 'app/providers/StoreProvider';

describe('getAlbumFormIsLoading', () => {
	test('should return true if album form is loading', () => {
		const state = {
			albumForm: {
				isLoading: true
			}
		};

		const isLoading = getAlbumFormIsLoading(state as StateSchema);

		expect(isLoading).toBe(true);
	});

	test('should return false if album form is not loading', () => {
		const state = {
			albumForm: {
				isLoading: false
			}
		};

		const isLoading = getAlbumFormIsLoading(state as StateSchema);

		expect(isLoading).toBe(false);
	});

	test('should return false if albumForm is not present in the state', () => {
		const state = {};

		const isLoading = getAlbumFormIsLoading(state as StateSchema);

		expect(isLoading).toBe(false);
	});
});
