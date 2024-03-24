import type { Meta, StoryObj } from '@storybook/react';
import { AlbumsGrid } from './AlbumsGrid';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

const meta: Meta<typeof AlbumsGrid> = {
	title: 'widgets/AlbumsGrid',
	component: AlbumsGrid,
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
type Story = StoryObj<typeof AlbumsGrid>;

export const Default: Story = {};
