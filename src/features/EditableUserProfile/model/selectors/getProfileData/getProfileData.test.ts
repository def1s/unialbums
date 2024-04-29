import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileData } from './getProfileData';

describe('getProfileData', () => {
	test('should return profile data from the state', () => {
		const state: DeepPartial<StateSchema> = {
			profile: {
				data: {
					username: 'user123',
					lastName: 'lastName',
					firstName: 'firstName',
					avatar: 'avatar'
				}
			}
		};

		const profileData = getProfileData(state as StateSchema);

		expect(profileData).toEqual({
			username: 'user123',
			lastName: 'lastName',
			firstName: 'firstName',
			avatar: 'avatar'
		});
	});

	test('should return undefined if profile data is not present in the state', () => {
		const state = {};

		const profileData = getProfileData(state as StateSchema);

		expect(profileData).toBeUndefined();
	});

	test('should return undefined if profile is not present in the state', () => {
		const state = {};

		const profileData = getProfileData(state as StateSchema);

		expect(profileData).toBeUndefined();
	});
});
