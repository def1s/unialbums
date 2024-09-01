import { StateSchema } from 'app/providers/StoreProvider';
import { getAlbumFormData } from './getAlbumFormData';

describe('getAlbumFormData', () => {
	test('should return album data from the state', () => {
		const state: DeepPartial<StateSchema> = {
			albumForm: {
				data: {
					title: 'My Album',
				}
			}
		};

		const formData = getAlbumFormData(state as StateSchema);

		expect(formData).toEqual({
			title: 'My Album',
		});
	});

	test('should return undefined if album data is not present in the state', () => {
		const state: DeepPartial<StateSchema> = {
			albumForm: {}
		};

		const formData = getAlbumFormData(state as StateSchema);

		expect(formData).toBeUndefined();
	});
});
