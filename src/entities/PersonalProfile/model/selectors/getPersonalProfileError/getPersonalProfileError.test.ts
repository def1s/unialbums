import { StateSchema } from 'app/providers/StoreProvider';
import { getPersonalProfileError } from './getPersonalProfileError';

describe('getProfileError', () => {
	test('should return profile error from the state', () => {
		const state = {
			personalProfile: {
				error: 'PersonalProfile not found'
			}
		};

		const profileError = getPersonalProfileError(state as StateSchema);

		expect(profileError).toEqual('PersonalProfile not found');
	});

	test('should return undefined if profile error is not present in the state', () => {
		const state = {};

		const profileError = getPersonalProfileError(state as StateSchema);

		expect(profileError).toBeUndefined();
	});

	test('should return undefined if profile is not present in the state', () => {
		const state = {};

		const profileError = getPersonalProfileError(state as StateSchema);

		expect(profileError).toBeUndefined();
	});
});
