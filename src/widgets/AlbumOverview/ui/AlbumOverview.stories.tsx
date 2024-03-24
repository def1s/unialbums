import type { Meta, StoryObj } from '@storybook/react';
import { AlbumOverview } from './AlbumOverview';

const meta: Meta<typeof AlbumOverview> = {
	title: 'widgets/AlbumOverview',
	component: AlbumOverview,
};

export default meta;
type Story = StoryObj<typeof AlbumOverview>;

export const Default: Story = {};
