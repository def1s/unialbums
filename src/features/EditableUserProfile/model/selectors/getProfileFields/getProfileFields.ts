import { createSelector } from '@reduxjs/toolkit';
import { getProfileData } from '../getProfileData/getProfileData';
import { ProfileFieldType } from 'entities/Profile/model/types/profile';

export const getProfileFields = createSelector(getProfileData, (profileData) => {
	const profileFieldsList: ProfileFieldType[] = [
		{
			label: 'Имя',
			value: profileData?.firstName || 'Поле пусто'
		},
		{
			label: 'Фамилия',
			value: profileData?.lastName || 'Поле пусто'
		},
		{
			label: 'Тестовое поле',
			value: 'Тестовое поле'
		}
	];

	return profileFieldsList;
});
