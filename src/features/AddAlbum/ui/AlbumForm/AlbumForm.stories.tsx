import type { Meta, StoryObj } from '@storybook/react';
import { AlbumForm } from './AlbumForm';

const meta: Meta<typeof AlbumForm> = {
	title: 'features/AlbumForm',
	component: AlbumForm
};

export default meta;
type Story = StoryObj<typeof AlbumForm>;

export const Default: Story = {};
