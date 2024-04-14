import type { Meta, StoryObj } from '@storybook/react';
import { InputFile } from './InputFile';

const meta: Meta<typeof InputFile> = {
	title: 'shared/InputFile',
	component: InputFile
};

export default meta;
type Story = StoryObj<typeof InputFile>;

export const Default: Story = {};
