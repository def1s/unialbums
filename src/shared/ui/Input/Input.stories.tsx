import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
	title: 'shared/Input',
	component: Input
};

export default meta;
type Story = StoryObj<typeof Input>;

export const DefaultTheme: Story = {
	args: {
		label: 'Placeholder'
	}
};

export const Error: Story = {
	args: {
		placeholder: 'Error',
		value: 'Значение',
		error: 'Something went wrong'
	}
};
