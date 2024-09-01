import type { Meta, StoryObj } from '@storybook/react';
import { IAlbumRating } from 'shared/types';
import { AlbumRating } from './AlbumRating';

const meta: Meta<typeof AlbumRating> = {
	title: 'entities/AlbumRating',
	component: AlbumRating,
};

const rating: IAlbumRating = {
	tracksRating: 10,
	atmosphereRating: 10,
	isEditable: true,
	bitsRating: 10,
	textRating: 10,
	totalRating: 10
};

export default meta;
type Story = StoryObj<typeof AlbumRating>;

export const Default: Story = {
	args: {
		data: rating
	}
};

export const Loading: Story = {
	args: {
		data: rating,
		isLoading: true
	}
};

export const Error: Story = {
	args: {
		data: rating,
		error: 'Что-то пошло не так'
	}
};

