import type { Meta, StoryObj } from '@storybook/react';
import WelcomePage from './WelcomePage';

const meta: Meta<typeof WelcomePage> = {
	title: 'pages/WelcomePage',
	component: WelcomePage
};

export default meta;
type Story = StoryObj<typeof WelcomePage>;

export const Default: Story = {};
