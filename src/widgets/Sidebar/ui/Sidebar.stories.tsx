import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof Sidebar> = {
	title: 'widgets/Sidebar',
	component: Sidebar,
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
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {};
