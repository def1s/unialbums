import { getAlbumFormError } from './getAlbumFormError';
import { StateSchema } from 'app/providers/StoreProvider';

describe('getAlbumFormError', () => {
	test('should return album form error from the state', () => {
		const state = {
			albumForm: {
				error: 'Invalid album title'
			}
		};

		const error = getAlbumFormError(state as StateSchema);

		expect(error).toEqual('Invalid album title');
	});

	test('should return undefined if album form error is not present in the state', () => {
		const state = {
			albumForm: {}
		};

		const error = getAlbumFormError(state as StateSchema);

		expect(error).toBeUndefined();
	});

	test('should return undefined if albumForm is not present in the state', () => {
		const state = {};

		const error = getAlbumFormError(state as StateSchema);

		expect(error).toBeUndefined();
	});
});
