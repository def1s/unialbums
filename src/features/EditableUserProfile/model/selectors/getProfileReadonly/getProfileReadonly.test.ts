import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileReadonly } from './getProfileReadonly';

describe('getProfileReadonly', () => {
	test('should return profile readonly value from the state', () => {
		const state = {
			profile: {
				readonly: true
			}
		};

		const profileReadonly = getProfileReadonly(state as StateSchema);

		expect(profileReadonly).toBe(true);
	});

	test('should return undefined if profile is not present in the state', () => {
		const state = {};

		const profileReadonly = getProfileReadonly(state as StateSchema);

		expect(profileReadonly).toBeUndefined();
	});
});
