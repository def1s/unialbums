import type { Meta, StoryObj } from '@storybook/react';
import { LoginModal } from './LoginModal';
import { StoreProvider } from 'app/providers/StoreProvider';

const meta: Meta<typeof LoginModal> = {
	title: 'features/LoginModal',
	component: LoginModal
};

export default meta;
type Story = StoryObj<typeof LoginModal>;

export const Default: Story = {
	args: {
		isOpen: true
	}
};

export const Loading: Story = {
	args: {
		isOpen: true
	},
	decorators: [
		(Story) => (
			<StoreProvider
				initialState={{
					loginForm: {
						isLoading: true,
						password: '',
						username: ''
					},
					userAlbums: undefined,
					user: undefined
				}}
			>
				<Story/>
			</StoreProvider>
		)
	]
};

export const Error: Story = {
	args: {
		isOpen: true
	},
	decorators: [
		(Story) => (
			<StoreProvider
				initialState={{
					loginForm: {
						error: 'Error message',
						isLoading: false,
						password: '',
						username: ''
					},
					userAlbums: undefined,
					user: undefined
				}}
			>
				<Story/>
			</StoreProvider>
		)
	]
};
