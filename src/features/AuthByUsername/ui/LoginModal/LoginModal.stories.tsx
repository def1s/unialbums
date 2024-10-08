import type { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { LoginModal } from './LoginModal';

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
		StoreDecorator({
			loginForm: {
				isLoading: true
			}
		})
	]
};

export const Error: Story = {
	args: {
		isOpen: true
	},
	decorators: [
		StoreDecorator({
			loginForm: {
				error: 'Error message'
			}
		})
	]
};

export const UnexpectedError: Story = {
	args: {
		isOpen: true
	},
	decorators: [
		StoreDecorator({
			loginForm: {
				username: 'для теста выполните вход'
			}
		})
	],
	parameters: {
		msw: {
			handlers: [
				rest.post(`${__API_URL__}/login`, (req, res, ctx) => {
					return res(
						ctx.status(404)
					);
				}),
			]
		},
	}
};
