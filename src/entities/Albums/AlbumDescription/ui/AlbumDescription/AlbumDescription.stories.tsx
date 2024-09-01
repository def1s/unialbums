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
	artist: 'Artist Name'
};

export default meta;
type Story = StoryObj<typeof AlbumDescription>;

export const Default: Story = {
	args: {
		data: album
	}
};

export const Loading: Story = {
	args: {
		data: album,
		isLoading: true
	}
};

export const Error: Story = {
	args: {
		data: album,
		error: 'Что-то пошло не так'
	}
};

