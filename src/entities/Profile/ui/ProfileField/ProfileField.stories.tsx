import type { Meta, StoryObj } from '@storybook/react';
import { ProfileField } from './ProfileField';

const meta: Meta<typeof ProfileField> = {
	title: 'entities/ProfileField',
	component: ProfileField
};

export default meta;
type Story = StoryObj<typeof ProfileField>;

export const Default: Story = {};
