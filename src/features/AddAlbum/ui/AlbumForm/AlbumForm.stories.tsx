import type { Meta, StoryObj } from '@storybook/react';
import { AlbumForm } from './AlbumForm';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';

const meta: Meta<typeof AlbumForm> = {
	title: 'features/AlbumForm',
	component: AlbumForm
};

export default meta;
type Story = StoryObj<typeof AlbumForm>;

export const Default: Story = {
	decorators: [
		StoreDecorator({})
	]
};
