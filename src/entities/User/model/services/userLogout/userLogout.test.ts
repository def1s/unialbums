import MockAdapter from 'axios-mock-adapter';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { userLogout } from './userLogout';
import axios from 'axios';
import { userActions } from '../../slice/userSlice';

describe('userLogout', () => {
	test('should dispatch userActions.logout() when receiving 200 status code', async () => {
		const mock = new MockAdapter(axios);
		mock.onGet(`${__API_URL__}/logout`).reply(200, {});

		const testAsyncThunk = new TestAsyncThunk(userLogout);
		const result = await testAsyncThunk.callThunk();

		expect(testAsyncThunk.dispatch).toHaveBeenCalledWith(userActions.logout());
		expect(result.meta.requestStatus).toBe('fulfilled');
	});
});
