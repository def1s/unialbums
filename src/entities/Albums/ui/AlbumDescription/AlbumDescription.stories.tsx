import type { Meta, StoryObj } from '@storybook/react';
import { AlbumDescription } from './AlbumDescription';

const meta: Meta<typeof AlbumDescription> = {
	title: 'entities/AlbumDescription',
	component: AlbumDescription,
};

export default meta;
type Story = StoryObj<typeof AlbumDescription>;

export const Default: Story = {
	args: {
		artist: 'Joji',
		title: 'Nectar',
		year: 2020,
		cover: 'https://upload.wikimedia.org/wikipedia/en/1/1b/Joji_-_Nectar.png',
		rating: 85,
		readonly: true
	}
};

export const Changeable: Story = {
	args: {
		artist: 'Joji',
		title: 'Nectar',
		year: 2020,
		cover: 'https://upload.wikimedia.org/wikipedia/en/1/1b/Joji_-_Nectar.png',
		rating: 85,
		readonly: false
	}
};
