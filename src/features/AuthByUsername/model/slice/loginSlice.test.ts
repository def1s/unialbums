import { LoginSchema } from '../types/loginSchema';
import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice', () => {
	test('test set username', () => {
		const state: DeepPartial<LoginSchema> = {
			username: ''
		};

		expect(loginReducer(
			state as LoginSchema,
			loginActions.setUsername('username'))
		).toEqual({ username: 'username' });
	});

	test('test set password', () => {
		const state: DeepPartial<LoginSchema> = {
			password: ''
		};

		expect(loginReducer(
			state as LoginSchema,
			loginActions.setPassword('password'))
		).toEqual({ password: 'password' });
	});
});
