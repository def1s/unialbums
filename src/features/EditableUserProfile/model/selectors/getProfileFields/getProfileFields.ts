import { createSelector } from '@reduxjs/toolkit';
import { ProfileFieldType } from 'entities/Profile/model/types/profile';
import { getProfileForm } from '../getProfileForm/getProfileForm';

export const getProfileFields = createSelector(getProfileForm, (profileData) => {
	const profileFieldsList: ProfileFieldType[] = [
		{
			label: 'Имя',
			value: profileData?.firstName || '',
			fieldName: 'firstName'
		},
		{
			label: 'Фамилия',
			value: profileData?.lastName || '',
			fieldName: 'lastName'
		}
	];

	return profileFieldsList;
});
