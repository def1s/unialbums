import MockAdapter from 'axios-mock-adapter';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { userActions } from '../../slice/userSlice';
import { userLogout } from './userLogout';

describe('userLogout', () => {
	test('should dispatch userActions.logout() when receiving 200 status code', async () => {
		const mock = new MockAdapter(axiosInstance);
		mock.onPost(`${__API_URL__}/logout`).reply(200, {});

		const testAsyncThunk = new TestAsyncThunk(userLogout);
		const result = await testAsyncThunk.callThunk();

		expect(testAsyncThunk.dispatch).toHaveBeenCalledWith(userActions.logout());
		expect(result.meta.requestStatus).toBe('fulfilled');
	});
});
