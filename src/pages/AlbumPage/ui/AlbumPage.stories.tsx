import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { AlbumPage } from './AlbumPage';

const meta: Meta<typeof AlbumPage> = {
	title: 'pages/AlbumsPage',
	component: AlbumPage,
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
type Story = StoryObj<typeof AlbumPage>;

export const Default: Story = {};
