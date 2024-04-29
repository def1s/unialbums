import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileError } from './getProfileError';

describe('getProfileError', () => {
	test('should return profile error from the state', () => {
		const state = {
			profile: {
				error: 'Profile not found'
			}
		};

		const profileError = getProfileError(state as StateSchema);

		expect(profileError).toEqual('Profile not found');
	});

	test('should return undefined if profile error is not present in the state', () => {
		const state = {};

		const profileError = getProfileError(state as StateSchema);

		expect(profileError).toBeUndefined();
	});

	test('should return undefined if profile is not present in the state', () => {
		const state = {};

		const profileError = getProfileError(state as StateSchema);

		expect(profileError).toBeUndefined();
	});
});
