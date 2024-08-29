import { StateSchema } from 'app/providers/StoreProvider';
import { getAlbumFormServerMessage } from './getAlbumFormServerMessage';

describe('getAlbumFormServerMessage', () => {
	test('should return album form message from the state', () => {
		const state = {
			albumForm: {
				serverMessage: 'Album created successfully'
			}
		};

		const message = getAlbumFormServerMessage(state as StateSchema);

		expect(message).toEqual('Album created successfully');
	});

	test('should return undefined if album form message is not present in the state', () => {
		const state = {
			albumForm: {}
		};

		const message = getAlbumFormServerMessage(state as StateSchema);

		expect(message).toBeUndefined();
	});

	test('should return undefined if albumForm is not present in the state', () => {
		const state = {};

		const message = getAlbumFormServerMessage(state as StateSchema);

		expect(message).toBeUndefined();
	});
});
