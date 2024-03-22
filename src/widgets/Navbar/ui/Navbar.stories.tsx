import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

const meta: Meta<typeof Navbar> = {
	title: 'widgets/Navbar',
	component: Navbar,
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
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {};
