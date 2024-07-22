import { albumFormReducer, albumFormActions } from './albumFormSlice';

describe('albumFormSlice', () => {
	const initialState = {
		data: {
			cover: '',
			title: '',
			artist: '',
			atmosphereRating: 1,
			textRating: 1,
			tracksRating: 1,
			bitsRating: 1,
		},
		isSearching: false,
		isLoading: false,
		error: undefined,
		message: undefined,
	};

	test('should handle setFieldValue', () => {
		const newState = albumFormReducer(initialState, albumFormActions.setFieldValue({
			title: 'New Album Title',
			artist: 'New Artist',
		}));

		expect(newState.data.title).toEqual('New Album Title');
		expect(newState.data.artist).toEqual('New Artist');
	});
});
