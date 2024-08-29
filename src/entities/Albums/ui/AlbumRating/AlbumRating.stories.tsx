import type { Meta, StoryObj } from '@storybook/react';
import { AlbumRating } from './AlbumRating';

const meta: Meta<typeof AlbumRating> = {
	title: 'shared/AlbumRating',
	component: AlbumRating,
};

export default meta;
type Story = StoryObj<typeof AlbumRating>;

export const Default: Story = {
	args: {
		data: {
			totalRating: 100
		},
		readonly: true
	}
};
