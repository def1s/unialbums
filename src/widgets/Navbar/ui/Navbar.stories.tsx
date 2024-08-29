import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { StoreProvider } from 'app/providers/StoreProvider';
import { Navbar } from './Navbar';

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
						username: 'username'
					},
					_inited: false
				},
				homePage: undefined
			}}
		>
			<Story/>
		</StoreProvider>
	)
];
