import type { Meta, StoryObj } from '@storybook/react';
import { Button, ThemeButton } from './Button';

const meta: Meta<typeof Button> = {
	title: 'shared/Button',
	component: Button
};

export default meta;
type Story = StoryObj<typeof Button>;

export const DefaultTheme: Story = {
	args: {
		children: 'Button'
	},
};

export const RedTheme: Story = {
	args: {
		children: 'Button',
		theme: ThemeButton.RED
	},
};
