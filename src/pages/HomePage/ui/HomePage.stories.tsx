import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { HomePage } from './HomePage';

const meta: Meta<typeof HomePage> = {
	title: 'pages/HomePage',
	component: HomePage,
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
type Story = StoryObj<typeof HomePage>;

export const Default: Story = {};
