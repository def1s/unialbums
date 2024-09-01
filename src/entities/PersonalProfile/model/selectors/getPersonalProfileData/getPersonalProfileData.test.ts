import { StateSchema } from 'app/providers/StoreProvider';
import { getPersonalProfileData } from './getPersonalProfileData';

describe('getPersonalProfileData', () => {
	test('should return profile data from the state', () => {
		const state: DeepPartial<StateSchema> = {
			personalProfile: {
				data: {
					username: 'user123',
					lastName: 'lastName',
					firstName: 'firstName',
					avatar: 'avatar'
				}
			}
		};

		const profileData = getPersonalProfileData(state as StateSchema);

		expect(profileData).toEqual({
			username: 'user123',
			lastName: 'lastName',
			firstName: 'firstName',
			avatar: 'avatar'
		});
	});

	test('should return undefined if profile data is not present in the state', () => {
		const state = {};

		const profileData = getPersonalProfileData(state as StateSchema);

		expect(profileData).toBeUndefined();
	});

	test('should return undefined if profile is not present in the state', () => {
		const state = {};

		const profileData = getPersonalProfileData(state as StateSchema);

		expect(profileData).toBeUndefined();
	});
});
