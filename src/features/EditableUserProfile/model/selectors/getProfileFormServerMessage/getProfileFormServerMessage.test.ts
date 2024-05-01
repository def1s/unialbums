import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileFormServerMessage } from './getProfileFormServerMessage';

describe('getProfileFormServerMessage', () => {
	test('should return profile form message from the state', () => {
		const state= {
			profile: {
				serverMessage: 'Profile updated successfully'
			}
		};

		const profileFormMessage = getProfileFormServerMessage(state as StateSchema);

		expect(profileFormMessage).toEqual('Profile updated successfully');
	});

	test('should return undefined if profile is not present in the state', () => {
		const state = {};

		const profileFormMessage = getProfileFormServerMessage(state as StateSchema);

		expect(profileFormMessage).toBeUndefined();
	});
});
