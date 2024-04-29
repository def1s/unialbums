import { ApiResponse } from 'shared/api/types/apiResponse';
import MockAdapter from 'axios-mock-adapter';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchProfileData } from './fetchProfileData';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { Profile } from 'entities/Profile';

describe('userInitAuthData', () => {
	const response: ApiResponse<Profile> = {
		data: [
			{
				username: '',
				avatar: '',
				firstName: '',
				lastName: ''
			}
		],
		message: ''
	};

	beforeEach(() => {
		response.data[0].username = '';
		response.data[0].avatar = '';
		response.data[0].firstName = '';
		response.data[0].lastName = '';
		response.message = '';
	});

	test('should return profile data when request is successful', async () => {
		response.data[0].username = 'username';
		response.data[0].avatar = 'avatar';
		response.data[0].firstName = 'firstName';
		response.data[0].lastName = 'lastName';
		response.message = 'message';

		const mock = new MockAdapter(axiosInstance);
		mock.onGet(`${__API_URL__}/users/myProfile`).reply(200, response);

		const testAsyncThunk = new TestAsyncThunk(fetchProfileData);
		const result = await testAsyncThunk.callThunk();

		expect(result.meta.requestStatus).toBe('fulfilled');
		expect(result.payload).toEqual(response.data[0]);
	});

	test('should rejected', async () => {
		const mock = new MockAdapter(axiosInstance);
		mock.onGet(`${__API_URL__}/users/getUserInfo`).reply(400, response);

		const testAsyncThunk = new TestAsyncThunk(fetchProfileData);
		const result = await testAsyncThunk.callThunk();

		expect(result.meta.requestStatus).toBe('rejected');
	});

	// test('should dispatch userActions.logout()', async () => {
	// 	const mock = new MockAdapter(axiosInstance);
	// 	mock.onGet(`${__API_URL__}/users/getUserInfo`).reply(403, response);
	//
	// 	const testAsyncThunk = new TestAsyncThunk(fetchProfileData);
	// 	const result = await testAsyncThunk.callThunk();
	//
	// 	expect(result.meta.requestStatus).toBe('rejected');
	// });
});
