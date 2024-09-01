import MockAdapter from 'axios-mock-adapter';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { User } from '../../types/user';
import { userInitAuthData } from './userInitAuthData';

describe('userInitAuthData', () => {
	const response: ApiResponse<User> = {
		data: {
			username: '',
			avatar: ''
		},
		message: ''
	};

	beforeEach(() => {
		response.data.username = 'username';
		response.data.avatar = 'avatar';
		response.message = '';
	});

	test('should dispatch userActions.logout() when receiving 403 status code', async () => {
		const mock = new MockAdapter(axiosInstance);
		mock.onGet(`${__API_URL__}/users/getUserInfo`).reply(403, {});

		const testAsyncThunk = new TestAsyncThunk(userInitAuthData);
		const result = await testAsyncThunk.callThunk();

		expect(result.meta.requestStatus).toBe('rejected');
	});
	test('should return user data when request is successful', async () => {
		const mock = new MockAdapter(axiosInstance);
		mock.onGet(`${__API_URL__}/initUser`).reply(200, response);

		const testAsyncThunk = new TestAsyncThunk(userInitAuthData);
		const result = await testAsyncThunk.callThunk();

		expect(result.payload).toEqual(response.data);
	});
});
