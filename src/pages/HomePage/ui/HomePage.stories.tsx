import type { Meta, StoryObj } from '@storybook/react';
import { HomePage } from './HomePage';

const meta: Meta<typeof HomePage> = {
	title: 'pages/HomePage',
	component: HomePage,
};

export default meta;
type Story = StoryObj<typeof HomePage>;

export const Default: Story = {};
