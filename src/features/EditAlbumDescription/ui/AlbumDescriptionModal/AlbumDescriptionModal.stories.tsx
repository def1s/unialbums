import type { Meta, StoryObj } from '@storybook/react';
import { AlbumDescriptionModal } from './AlbumDescriptionModal';

const meta: Meta<typeof AlbumDescriptionModal> = {
	title: 'features/AlbumDescriptionModal',
	component: AlbumDescriptionModal
};

export default meta;
type Story = StoryObj<typeof AlbumDescriptionModal>;

export const Default: Story = {
	args: {
		isOpen: true
	}
};
