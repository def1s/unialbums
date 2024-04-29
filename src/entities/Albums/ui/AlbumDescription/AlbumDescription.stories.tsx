import type { Meta, StoryObj } from '@storybook/react';
import { AlbumDescription } from './AlbumDescription';
import { Album } from 'entities/Albums';

const meta: Meta<typeof AlbumDescription> = {
	title: 'entities/AlbumDescription',
	component: AlbumDescription,
};

const album: Album = {
	cover: 'https://example.com/cover.jpg',
	title: 'Album Title',
	artist: 'Artist Name',
	albumId: 1,
	tracksRating: 1,
	textRating: 1,
	bitsRating: 1,
	atmosphereRating: 1
};

export default meta;
type Story = StoryObj<typeof AlbumDescription>;

export const Default: Story = {
	args: {
		data: album,
		readonly: true
	}
};

export const Changeable: Story = {
	args: {
		data: album,
		readonly: false
	}
};
