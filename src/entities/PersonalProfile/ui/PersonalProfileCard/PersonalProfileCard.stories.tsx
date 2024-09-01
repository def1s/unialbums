import type { Meta, StoryObj } from '@storybook/react';
import UserAvatar from 'shared/assets/storybook/avatar.jpg';
import { PersonalProfileCard } from './PersonalProfileCard';

const meta: Meta<typeof PersonalProfileCard> = {
	title: 'entities/PersonalProfileCard',
	component: PersonalProfileCard
};

export default meta;
type Story = StoryObj<typeof PersonalProfileCard>;

const user = {
	avatar: UserAvatar,
	firstName: 'Даниил',
	lastName: 'Федоров',
	username: 'def1s'
};

export const Default: Story = {
	args: {
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
		error: 'Текст ошибки'
	}
};
