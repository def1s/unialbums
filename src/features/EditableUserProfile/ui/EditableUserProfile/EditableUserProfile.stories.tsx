import type { Meta, StoryObj } from '@storybook/react';
import { EditableUserProfile } from './EditableUserProfile';

const meta: Meta<typeof EditableUserProfile> = {
	title: 'features/EditableUserProfile',
	component: EditableUserProfile
};

export default meta;
type Story = StoryObj<typeof EditableUserProfile>;

export const Default: Story = {};
