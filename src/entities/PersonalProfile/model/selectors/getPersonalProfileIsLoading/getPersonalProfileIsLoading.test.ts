import { StateSchema } from 'app/providers/StoreProvider';
import { getPersonalProfileIsLoading } from './getPersonalProfileIsLoading';

describe('getProfileIsLoading', () => {
	test('should return profile isLoading value from the state', () => {
		const state = {
			personalProfile: {
				isLoading: true
			}
		};

		const profileIsLoading = getPersonalProfileIsLoading(state as StateSchema);

		expect(profileIsLoading).toBe(true);
	});

	test('should return false if profile is not present in the state', () => {
		const state = {};

		const profileIsLoading = getPersonalProfileIsLoading(state as StateSchema);

		expect(profileIsLoading).toBe(false);
	});
});
