import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileForm } from './getProfileForm';

describe('getProfileForm', () => {
	test('should return profile form from the state', () => {
		const state: DeepPartial<StateSchema> = {
			profile: {
				form: {
					username: 'user123',
					avatar: 'avatar',
					firstName: 'firstName',
					lastName: 'lastName'
				}
			}
		};

		const profileForm = getProfileForm(state as StateSchema);

		expect(profileForm).toEqual({
			username: 'user123',
			avatar: 'avatar',
			firstName: 'firstName',
			lastName: 'lastName'
		});
	});


	test('should return undefined if profile is not present in the state', () => {
		const state: DeepPartial<StateSchema>  = {};

		const profileForm = getProfileForm(state as StateSchema);

		expect(profileForm).toBeUndefined();
	});
});
