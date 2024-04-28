import { StateSchema } from 'app/providers/StoreProvider';
import { getUserAuthData } from './getUserAuthData';

describe('getUserAuthData', () => {
	test('should return authData', () => {
		const state: DeepPartial<StateSchema> = {
			user: {
				authData: {
					username: 'username',
					avatar: 'avatar'
				}
			}
		};

		expect(getUserAuthData(state as StateSchema)).toEqual({
			username: 'username',
			userId: 1,
			firstName: 'name',
			avatar: 'avatar'
		});
	});
});
