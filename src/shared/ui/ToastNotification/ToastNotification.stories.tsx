import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { NotificationTypes } from 'shared/types/notificationTypes';
import { ToastNotification } from './ToastNotification';

const meta: Meta<typeof ToastNotification> = {
	title: 'shared/ToastNotification',
	component: ToastNotification
};

export default meta;
type Story = StoryObj<typeof ToastNotification>;

export const Success: Story = {
	args: {
		message: 'NOTIFICATION'
	}
};

export const Error: Story = {
	args: {
		message: 'NOTIFICATION',
		theme: NotificationTypes.ERROR
	}
};

export const LongNotification: Story = {
	args: {
		message: 'lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum, lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum',
		theme: NotificationTypes.SUCCESS
	}
};
