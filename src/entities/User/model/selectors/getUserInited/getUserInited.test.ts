import { StateSchema } from 'app/providers/StoreProvider';
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { getUserInited } from 'entities/User';

describe('getUserInited', () => {
	test('should return inited flag', () => {
		const state: DeepPartial<StateSchema> = {
			user: {
				_inited: false
			}
		};

		expect(getUserInited(state as StateSchema)).toEqual(false);
	});
});
