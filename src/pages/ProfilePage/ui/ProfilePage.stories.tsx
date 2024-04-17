import type { Meta, StoryObj } from '@storybook/react';
import ProfilePage from './ProfilePage';

const meta: Meta<typeof ProfilePage> = {
	title: 'pages/ProfilePage',
	component: ProfilePage,
};

export default meta;
type Story = StoryObj<typeof ProfilePage>;

export const Default: Story = {};
