import type { Meta, StoryObj } from '@storybook/react';
import { RegistrationModal } from './RegistrationModal';
import { rest } from 'msw';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';

const meta: Meta<typeof RegistrationModal> = {
	title: 'features/RegistrationModal',
	component: RegistrationModal
};

export default meta;
type Story = StoryObj<typeof RegistrationModal>;

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
			registrationForm: {
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
			registrationForm: {
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
			registrationForm: {
				username: 'для теста выполните вход'
			}
		})
	],
	parameters: {
		msw: {
			handlers: [
				rest.post(`${__API_URL__}/registration`, (req, res, ctx) => {
					return res(
						ctx.status(404)
					);
				}),
			]
		},
	}
};
