import type { Meta, StoryObj } from '@storybook/react';
import { EditableProfileCard } from './EditableProfileCard';
import UserAvatar from 'shared/assets/storybook/avatar.jpg';

const meta: Meta<typeof EditableProfileCard> = {
	title: 'entities/EditableProfileCard',
	component: EditableProfileCard
};

export default meta;
type Story = StoryObj<typeof EditableProfileCard>;

export const Default: Story = {
	args: {
		data: {
			avatar: UserAvatar,
			firstName: 'Имя',
			lastName: 'Фамилия',
			username: 'def1s'
		}
	}
};

export const Readonly: Story = {
	args: {
		readonly: true,
		data: {
			avatar: UserAvatar,
			firstName: 'Имя',
			lastName: 'Фамилия',
			username: 'def1s'
		}
	}
};
