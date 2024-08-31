import type { Meta, StoryObj } from '@storybook/react';
import { IAlbum } from 'shared/types';
import { AlbumDescription } from './AlbumDescription';

const meta: Meta<typeof AlbumDescription> = {
	title: 'entities/AlbumDescription',
	component: AlbumDescription,
};

const album: IAlbum = {
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
		data: album
	}
};

export const Changeable: Story = {
	args: {
		data: album
	}
};
