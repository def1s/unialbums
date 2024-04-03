import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';
import { StoreProvider } from 'app/providers/StoreProvider';

const meta: Meta<typeof Navbar> = {
	title: 'widgets/Navbar',
	component: Navbar
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const NotLogin: Story = {};

export const Login: Story = {};
Login.decorators = [
	(Story) => (
		<StoreProvider
			initialState={{
				user: {
					authData: {
						userId: 1,
						firstName: 'first name',
						username: 'username'
					},
					_inited: false
				},
				userAlbums: undefined
			}}
		>
			<Story/>
		</StoreProvider>
	)
];
