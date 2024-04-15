// import axios from 'axios';
// import { ApiResponse, token } from 'shared/api/types/apiResponse';
// import { loginByUsername } from './loginByUsername';
// import { Dispatch } from '@reduxjs/toolkit';
// import { StateSchema } from 'app/providers/StoreProvider';
//
// jest.mock('axios');
//
// const mockedAxios = jest.mocked(axios);
//
// describe('loginByUsername', () => {
// 	let dispatch: Dispatch;
// 	let getState: () => StateSchema;
//
// 	beforeEach(() => {
// 		dispatch = jest.fn();
// 		getState = jest.fn();
// 	});
//
// 	test('test', async () => {
// 		const response: ApiResponse<token> = {
// 			data: [
// 				{
// 					accessToken: 'token'
// 				}
// 			],
// 			message: 'message'
// 		};
// 		mockedAxios.post.mockResolvedValueOnce(response);
//
// 		// mockedAxios.post.mockReturnValue(Promise.resolve({ data: response }));
// 		const action = loginByUsername({ username: '123', password: '123' });
// 		const result = await action(dispatch, getState, undefined);
// 		console.log(result);
// 		// expect(mockedAxios).toHaveBeenCalled();
// 		// expect(result.meta.requestStatus).toBe('fulfilled');
// 	});
// });
