import type { Meta, StoryObj } from '@storybook/react';
import { EditableProfileCard } from './EditableProfileCard';
import UserAvatar from 'shared/assets/storybook/avatar.jpg';
import { ProfileFieldType } from 'entities/Profile/model/types/profile';

const meta: Meta<typeof EditableProfileCard> = {
	title: 'entities/EditableProfileCard',
	component: EditableProfileCard
};

export default meta;
type Story = StoryObj<typeof EditableProfileCard>;

const fields: ProfileFieldType[] = [
	{
		label: 'Пользователь',
		value: 'def1s'
	},
	{
		label: 'Имя',
		value: 'Даниил'
	},
	{
		label: 'Фамилия',
		value: 'Федоров'
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
