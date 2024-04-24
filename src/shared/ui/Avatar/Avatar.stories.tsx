import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarSize } from './Avatar';
import AvatarIcon from 'shared/assets/storybook/avatar.jpg';

const meta: Meta<typeof Avatar> = {
	title: 'shared/Avatar',
	component: Avatar
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Small: Story = {
	args: {
		src: AvatarIcon,
		size: AvatarSize.SMALL
	}
};

export const Medium: Story = {
	args: {
		src: AvatarIcon,
		size: AvatarSize.MEDIUM
	}
};

export const Large: Story = {
	args: {
		src: AvatarIcon,
		size: AvatarSize.LARGE
	}
};
