import type { Meta, StoryObj } from '@storybook/react';
import { ProfileCard } from './ProfileCard';
import UserAvatar from 'shared/assets/storybook/avatar.jpg';

const meta: Meta<typeof ProfileCard> = {
	title: 'entities/ProfileCard',
	component: ProfileCard
};

export default meta;
type Story = StoryObj<typeof ProfileCard>;

const user = {
	avatar: UserAvatar,
	firstName: 'Даниил',
	lastName: 'Федоров',
	username: 'def1s'
};

export const Default: Story = {
	args: {
		readonly: true,
		data: user
	}
};

export const Changeable: Story = {
	args: {
		data: user
	}
};

export const Loading: Story = {
	args: {
		isLoading: true
	}
};
