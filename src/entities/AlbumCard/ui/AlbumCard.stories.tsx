import type { Meta, StoryObj } from '@storybook/react';
import { AlbumCard } from './AlbumCard';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

const meta: Meta<typeof AlbumCard> = {
	title: 'entities/AlbumCard',
	component: AlbumCard,
	// декоратор для ссылок
	decorators: [
		(Story) => (
			<BrowserRouter>
				<Story/>
			</BrowserRouter>
		)
	]
};

export default meta;
type Story = StoryObj<typeof AlbumCard>;

export const Default: Story = {
	args: {
		title: 'Some title',
		cover: 'https://avatars.yandex.net/get-music-content/5496390/e9ae50ee.a.21527303-1/m1000x1000',
		albumId: 1,
		artist: 'Joji'
	},
};
