import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { MainPage } from 'pages/MainPage';

const meta: Meta<typeof MainPage> = {
	title: 'pages/MainPage',
	component: MainPage,
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
type Story = StoryObj<typeof MainPage>;

export const Default: Story = {};
