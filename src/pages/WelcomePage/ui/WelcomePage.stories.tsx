import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { WelcomePage } from 'pages/WelcomePage';

const meta: Meta<typeof WelcomePage> = {
	title: 'pages/WelcomePage',
	component: WelcomePage,
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
type Story = StoryObj<typeof WelcomePage>;

export const Default: Story = {};
