import type { Meta, StoryObj } from '@storybook/react';
import { IAlbum } from 'shared/types';
import { AlbumsGrid } from './AlbumsGrid';

const meta: Meta<typeof AlbumsGrid> = {
	title: 'entities/AlbumsGrid',
	component: AlbumsGrid,
};

const albums: IAlbum[] = [
	{
		albumId: 1,
		title: 'Album Title',
		artist: 'Artist Name',
		cover: 'https://example.com/cover.jpg',
		tracksRating: 10,
		atmosphereRating: 10,
		isEditable: true,
		bitsRating: 10,
		textRating: 10,
		totalRating: 10
	},
	{
		albumId: 2,
		title: 'Album Title',
		artist: 'Artist Name',
		cover: 'https://example.com/cover.jpg',
		tracksRating: 10,
		atmosphereRating: 10,
		isEditable: true,
		bitsRating: 10,
		textRating: 10,
		totalRating: 10
	},
	{
		albumId: 3,
		title: 'Album Title',
		artist: 'Artist Name',
		cover: 'https://example.com/cover.jpg',
		tracksRating: 10,
		atmosphereRating: 10,
		isEditable: true,
		bitsRating: 10,
		textRating: 10,
		totalRating: 10
	}
];

export default meta;
type Story = StoryObj<typeof AlbumsGrid>;

export const Default: Story = {
	args: {
		albums: albums
	}
};

export const Loading: Story = {
	args: {
		albums: albums,
		isLoading: true
	}
};

export const Error: Story = {
	args: {
		albums: albums,
		error: 'Что-то пошло не так'
	}
};

export const EmptyAlbums: Story = {
	args: {
		albums: []
	}
};
