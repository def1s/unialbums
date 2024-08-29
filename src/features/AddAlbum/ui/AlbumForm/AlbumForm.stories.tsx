import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { AlbumForm } from './AlbumForm';

const meta: Meta<typeof AlbumForm> = {
	title: 'features/AlbumForm',
	component: AlbumForm
};

export default meta;
type Story = StoryObj<typeof AlbumForm>;

export const Default: Story = {};

export const Loading: Story = {
	decorators: [
		StoreDecorator({
			albumForm: {
				isLoading: true
			}
		})
	]
};

export const Error: Story = {
	decorators: [
		StoreDecorator({
			albumForm: {
				error: 'Сообщение об ошибке'
			}
		})
	]
};

export const Successful: Story = {
	decorators: [
		StoreDecorator({
			albumForm: {
				serverMessage: 'Все прошло успешно'
			}
		})
	]
};
