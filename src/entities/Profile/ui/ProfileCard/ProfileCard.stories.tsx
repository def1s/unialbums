import type { Meta, StoryObj } from '@storybook/react';
import { ProfileCard } from './ProfileCard';
import UserAvatar from 'shared/assets/storybook/avatar.jpg';
import { ProfileFieldType } from 'entities/Profile/model/types/profile';

const meta: Meta<typeof ProfileCard> = {
	title: 'entities/ProfileCard',
	component: ProfileCard
};

export default meta;
type Story = StoryObj<typeof ProfileCard>;

const fields: ProfileFieldType[] = [
	{
		label: 'Пользователь',
		value: 'def1s',
		fieldName: 'username'
	},
	{
		label: 'Имя',
		value: 'Даниил',
		fieldName: 'firstName'
	},
	{
		label: 'Фамилия',
		value: 'Федоров',
		fieldName: 'lastName'
	}
];

const user = {
	avatar: UserAvatar,
	firstName: 'Даниил',
	lastName: 'Федоров',
	username: 'def1s'
};

export const Default: Story = {
	args: {
		fields,
		readonly: true,
		data: user
	}
};

export const Changeable: Story = {
	args: {
		fields,
		data: user
	}
};

export const Loading: Story = {
	args: {
		isLoading: true
	}
};

export const Error: Story = {
	args: {
		error: 'Сообщение об ошибке'
	}
};
