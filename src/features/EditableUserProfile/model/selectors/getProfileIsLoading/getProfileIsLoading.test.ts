import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileIsLoading } from './getProfileIsLoading';

describe('getProfileIsLoading', () => {
	test('should return profile isLoading value from the state', () => {
		const state = {
			profile: {
				isLoading: true
			}
		};

		const profileIsLoading = getProfileIsLoading(state as StateSchema);

		expect(profileIsLoading).toBe(true);
	});

	test('should return false if profile is not present in the state', () => {
		const state = {};

		const profileIsLoading = getProfileIsLoading(state as StateSchema);

		expect(profileIsLoading).toBe(false);
	});
});
