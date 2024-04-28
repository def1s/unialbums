import { userActions, userReducer, UserSchema } from 'entities/User';

describe('userSlice', () => {
	// test('test set authData', () => {
	// 	const state: DeepPartial<UserSchema> = {
	// 		authData: {
	// 			username: undefined,
	// 			userId: undefined,
	// 			avatar: undefined,
	// 			firstName: undefined
	// 		}
	// 	};
	//
	// 	const data = {
	// 		username: 'username',
	// 		userId: 1,
	// 		avatar: 'avatar',
	// 		firstName: 'name'
	// 	};
	//
	// 	expect(userReducer(
	// 		state as UserSchema,
	// 		userActions.setAuthData(data)
	// 	)).toEqual({
	// 		authData: data
	// 	});
	// });

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

	// test('test init auth data', () => {
	// 	const state: DeepPartial<UserSchema> = {
	// 		_inited: false
	// 	};
	//
	// 	expect(userReducer(
	// 		state as UserSchema,
	// 		userActions.iniAuthData()
	// 	)).toEqual({
	// 		_inited: true
	// 	});
	// });
});
