import { getAlbumFormMessage } from './getAlbumFormMessage';
import { StateSchema } from 'app/providers/StoreProvider';

describe('getAlbumFormMessage', () => {
	test('should return album form message from the state', () => {
		const state = {
			albumForm: {
				message: 'Album created successfully'
			}
		};

		const message = getAlbumFormMessage(state as StateSchema);

		expect(message).toEqual('Album created successfully');
	});

	test('should return undefined if album form message is not present in the state', () => {
		const state = {
			albumForm: {}
		};

		const message = getAlbumFormMessage(state as StateSchema);

		expect(message).toBeUndefined();
	});

	test('should return undefined if albumForm is not present in the state', () => {
		const state = {};

		const message = getAlbumFormMessage(state as StateSchema);

		expect(message).toBeUndefined();
	});
});
