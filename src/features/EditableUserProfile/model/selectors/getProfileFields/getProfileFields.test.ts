import { getProfileFields } from './getProfileFields';
import { ProfileFieldType } from 'entities/Profile/model/types/profile';
import { StateSchema } from 'app/providers/StoreProvider';

describe('getProfileFields', () => {
	test('should return profile fields list with correct values', () => {
		const state = {
			profile: {
				form: {
					firstName: 'John',
					lastName: 'Doe',
					username: 'johndoe'
				}
			}
		};

		const profileFields = getProfileFields(state as StateSchema);

		const expectedProfileFields: ProfileFieldType[] = [
			{
				label: 'Имя',
				value: 'John',
				fieldName: 'firstName'
			},
			{
				label: 'Фамилия',
				value: 'Doe',
				fieldName: 'lastName'
			},
			{
				label: 'Имя пользователя',
				value: 'johndoe',
				fieldName: 'username'
			}
		];

		expect(profileFields).toEqual(expectedProfileFields);
	});

	test('should return profile fields list with empty values if profile data is not present', () => {
		const state = {} as StateSchema;

		const profileFields = getProfileFields(state);

		const expectedProfileFields: ProfileFieldType[] = [
			{
				label: 'Имя',
				value: '',
				fieldName: 'firstName'
			},
			{
				label: 'Фамилия',
				value: '',
				fieldName: 'lastName'
			},
			{
				label: 'Имя пользователя',
				value: '',
				fieldName: 'username'
			}
		];

		expect(profileFields).toEqual(expectedProfileFields);
	});
});
