import { userActions, userReducer, UserSchema } from '../../../User';

describe('userSlice', () => {
	test('test logout', () => {
		const state: DeepPartial<UserSchema> = {
			authData: {
				username: 'username',
				avatar: 'avatar'
			}
		};

		expect(userReducer(
			state as UserSchema,
			userActions.logout()
		)).toEqual({
			authData: undefined
		});
	});
});
