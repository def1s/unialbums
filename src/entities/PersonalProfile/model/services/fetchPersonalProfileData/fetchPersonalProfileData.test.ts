import MockAdapter from 'axios-mock-adapter';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { IProfile } from 'shared/types';
import { fetchPersonalProfileData } from './fetchPersonalProfileData';

describe('userInitAuthData', () => {
	const response: ApiResponse<IProfile> = {
		data: {
			username: '',
			avatar: '',
			firstName: '',
			lastName: ''
		},
		message: ''
	};

	beforeEach(() => {
		response.data.username = '';
		response.data.avatar = '';
		response.data.firstName = '';
		response.data.lastName = '';
		response.message = '';
	});

	test('should return profile data when request is successful', async () => {
		response.data.username = 'username';
		response.data.avatar = 'avatar';
		response.data.firstName = 'firstName';
		response.data.lastName = 'lastName';
		response.message = 'message';

		const mock = new MockAdapter(axiosInstance);
		mock.onGet(`${__API_URL__}/users/myProfile`).reply(200, response);

		const testAsyncThunk = new TestAsyncThunk(fetchPersonalProfileData);
		const result = await testAsyncThunk.callThunk();

		expect(result.meta.requestStatus).toBe('fulfilled');
		expect(result.payload).toEqual(response.data);
	});

	test('should rejected', async () => {
		const mock = new MockAdapter(axiosInstance);
		mock.onGet(`${__API_URL__}/users/getUserInfo`).reply(400, response);

		const testAsyncThunk = new TestAsyncThunk(fetchPersonalProfileData);
		const result = await testAsyncThunk.callThunk();

		expect(result.meta.requestStatus).toBe('rejected');
	});

	// test('should dispatch userActions.logout()', async () => {
	// 	const mock = new MockAdapter(axiosInstance);
	// 	mock.onGet(`${__API_URL__}/users/getUserInfo`).reply(403, response);
	//
	// 	const testAsyncThunk = new TestAsyncThunk(fetchPersonalProfileData);
	// 	const result = await testAsyncThunk.callThunk();
	//
	// 	expect(result.meta.requestStatus).toBe('rejected');
	// });
});
