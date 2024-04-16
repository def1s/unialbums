// import { ApiResponse } from 'shared/api/types/apiResponse';
// import MockAdapter from 'axios-mock-adapter';
// import axios from 'axios';
// import { AlbumForm } from 'features/AddAlbum/model/types/albumFormSchema';
// import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
// import { addAlbumToUser } from 'features/AddAlbum/model/services/addAlbumToUser/addAlbumToUser';
//
// // jest.mock('node-fetch', () => jest.fn());
//
// describe('addAlbumToUser', () => {
// 	const response: ApiResponse<null> = {
// 		data: null,
// 		message: ''
// 	};
//
// 	beforeEach(() => {
// 		response.message = '';
// 	});
//
// 	test('should be fulfilled', async () => {
// 		response.message = 'Successful';
// 		const mockFormDataAppend = jest.fn();
//
// 		const album: AlbumForm = {
// 			cover: 'cover',
// 			artist: 'artist',
// 			title: 'title'
// 		};
//
// 		// @ts-ignore
// 		global.FormData = jest.fn(() => ({
// 			append: mockFormDataAppend
// 		}));
//
// 		const mock = new MockAdapter(axios);
// 		mock.onPost('/albums/create').reply(200, response);
//
// 		const testAsyncThunk = new TestAsyncThunk(addAlbumToUser);
// 		const result = await testAsyncThunk.callThunk(album);
//
// 		expect(result.meta.requestStatus).toBe('fulfilled');
// 	});
// });
