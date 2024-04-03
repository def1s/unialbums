import type { Meta, StoryObj } from '@storybook/react';
import { AlbumsGrid } from './AlbumsGrid';
import { Album } from 'entities/AlbumCard';

const meta: Meta<typeof AlbumsGrid> = {
	title: 'widgets/AlbumsGrid',
	component: AlbumsGrid
};

export default meta;
type Story = StoryObj<typeof AlbumsGrid>;

const mockedAlbums: Album[] = [
	{
		albumId: 1,
		artist: 'artist',
		cover: 'cover',
		title: 'title'
	},
	{
		albumId: 2,
		artist: 'artist',
		cover: 'cover',
		title: 'title'
	},
	{
		albumId: 3,
		artist: 'artist',
		cover: 'cover',
		title: 'title'
	}
];

export const WithAlbums = () => <AlbumsGrid/>;
