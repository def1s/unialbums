import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { AlbumsListPage } from './AlbumsListPage';

const meta: Meta<typeof AlbumsListPage> = {
	title: 'pages/AlbumsListPage',
	component: AlbumsListPage,
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
type Story = StoryObj<typeof AlbumsListPage>;

export const Default: Story = {};
