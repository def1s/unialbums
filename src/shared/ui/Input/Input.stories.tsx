import type { Meta, StoryObj } from '@storybook/react';
import { Input, ThemeInput } from './Input';

const meta: Meta<typeof Input> = {
	title: 'shared/Input',
	component: Input
};

export default meta;
type Story = StoryObj<typeof Input>;

export const DefaultTheme: Story = {
	args: {
		placeholder: 'Placeholder text'
	}
};

export const Readonly: Story = {
	args: {
		readonly: true,
		value: 'some text'
	}
};

export const OnlyBorder: Story = {
	args: {
		placeholder: 'Only border',
		theme: ThemeInput.ONLY_BORDER
	}
};

export const OnlyBottomBorder: Story = {
	args: {
		placeholder: 'Only bottom border',
		theme: ThemeInput.ONLY_BOTTOM_BORDER
	}
};
