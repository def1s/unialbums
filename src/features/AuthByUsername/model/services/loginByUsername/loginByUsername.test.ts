import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse, token } from 'shared/api/types/apiResponse';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { loginByUsername } from './loginByUsername';

describe('loginByUsername', () => {
	const response: ApiResponse<token> = {
		data: {
			accessToken: ''
		},
		message: ''
	};

	beforeEach(() => {
		response.data.accessToken = '';
		response.message = '';
	});

	// test('should be fulfilled (200)', async () => {
	// 	response.data[0].accessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiZXhwIjoxNzEzMjExNTA1LCJhdmF0YXIiOiJhdmF0YXIiLCJyb2xlIjoiVVNFUiIsImZpcnN0TmFtZSI6IlRlc3ROYW1lIiwidXNlcklkIjoxMjM0fQ.GyNrAxEv0z3Prhxl5nwo-JYjfobpPVEBDrgpFqMtuZ5aYjO_ydAYhXNP5RGg5OPsTY48SUfoGbY98fxdNgo4Xw';
	//
	// 	const mock = new MockAdapter(axios);
	// 	mock.onPost(`${__API_URL__}/login`).reply(200, response);
	//
	// 	const user = {
	// 		userId: 1234,
	// 		avatar: 'avatar',
	// 		username: 'test',
	// 		firstName: 'TestName',
	// 		role: 'USER',
	// 		exp: 1713211505
	// 	};
	//
	// 	const testAsyncThunk = new TestAsyncThunk(loginByUsername);
	// 	const result = await testAsyncThunk.callThunk({ username: '123', password: '123' });
	//
	// 	expect(testAsyncThunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(user));
	// 	expect(result.meta.requestStatus).toBe('fulfilled');
	// });

	test('should be rejected (wrong token)', async () => {
		response.data.accessToken = 'wrongToken';

		const mock = new MockAdapter(axios);
		mock.onPost(`${__API_URL__}/loginByUsername`).reply(200, response);


		const testAsyncThunk = new TestAsyncThunk(loginByUsername);
		const result = await testAsyncThunk.callThunk({ username: '123', password: '123' });

		expect(result.meta.requestStatus).toBe('rejected');
	});

	test('should be rejected (error login)', async () => {
		const mock = new MockAdapter(axios);
		mock.onPost(`${__API_URL__}/loginByUsername`).reply(400, response);

		const testAsyncThunk = new TestAsyncThunk(loginByUsername);
		const result = await testAsyncThunk.callThunk({ username: '123', password: '123' });

		expect(result.meta.requestStatus).toBe('rejected');
	});

	// тест не работает, как-то связано с моками
	test('should return error message', async () => {
		response.message = 'Error message';
		const mock = new MockAdapter(axiosInstance);
		mock.onPost(`${__API_URL__}/loginByUsername`).reply(400, response);

		const testAsyncThunk = new TestAsyncThunk(loginByUsername);
		const result = await testAsyncThunk.callThunk({ username: '123', password: '123' });

		expect(result.meta.requestStatus).toBe('rejected');
		expect(result.payload).toBe('Error message');
	});
});
