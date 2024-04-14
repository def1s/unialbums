import type { Meta, StoryObj } from '@storybook/react';
import { RangeSlider } from './RangeSlider';

const meta: Meta<typeof RangeSlider> = {
	title: 'shared/RangeSlider',
	component: RangeSlider
};

export default meta;
type Story = StoryObj<typeof RangeSlider>;

export const Default: Story = {};
