import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileFormMessage } from './getProfileFormMessage';

describe('getProfileFormMessage', () => {
	test('should return profile form message from the state', () => {
		const state= {
			profile: {
				message: 'Profile updated successfully'
			}
		};

		const profileFormMessage = getProfileFormMessage(state as StateSchema);

		expect(profileFormMessage).toEqual('Profile updated successfully');
	});

	test('should return undefined if profile is not present in the state', () => {
		const state = {};

		const profileFormMessage = getProfileFormMessage(state as StateSchema);

		expect(profileFormMessage).toBeUndefined();
	});
});
