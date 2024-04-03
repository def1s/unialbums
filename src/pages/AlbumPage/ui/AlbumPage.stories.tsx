import type { Meta, StoryObj } from '@storybook/react';
import { AlbumPage } from './AlbumPage';

const meta: Meta<typeof AlbumPage> = {
	title: 'pages/AlbumPage',
	component: AlbumPage
};

export default meta;
type Story = StoryObj<typeof AlbumPage>;

export const Default: Story = {};
