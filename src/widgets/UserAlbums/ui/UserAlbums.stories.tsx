import type { Meta, StoryObj } from '@storybook/react';
import { UserAlbums } from './UserAlbums';

const meta: Meta<typeof UserAlbums> = {
	title: 'widgets/UserAlbums',
	component: UserAlbums
};

export default meta;
type Story = StoryObj<typeof UserAlbums>;

const mockedAlbums = [
	{
		albumId: 1,
		artist: 'artist',
		cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/b8/42/74/b8427409-1c8f-5c8a-dee2-82a4ed7b6954/190296940323.jpg/632x632bb.webp',
		title: 'title',
		atmosphereRating: 1,
		bitsRating: 1,
		textRating: 1,
		tracksRating: 1
	},
	{
		albumId: 2,
		artist: 'artist',
		cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/b8/42/74/b8427409-1c8f-5c8a-dee2-82a4ed7b6954/190296940323.jpg/632x632bb.webp',
		title: 'title',
		atmosphereRating: 1,
		bitsRating: 1,
		textRating: 1,
		tracksRating: 1
	},
	{
		albumId: 3,
		artist: 'artist',
		cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/b8/42/74/b8427409-1c8f-5c8a-dee2-82a4ed7b6954/190296940323.jpg/632x632bb.webp',
		title: 'title',
		atmosphereRating: 1,
		bitsRating: 1,
		textRating: 1,
		tracksRating: 1
	},
	{
		albumId: 4,
		artist: 'artist',
		cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/b8/42/74/b8427409-1c8f-5c8a-dee2-82a4ed7b6954/190296940323.jpg/632x632bb.webp',
		title: 'title',
		atmosphereRating: 1,
		bitsRating: 1,
		textRating: 1,
		tracksRating: 1
	},
	{
		albumId: 5,
		artist: 'artist',
		cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/b8/42/74/b8427409-1c8f-5c8a-dee2-82a4ed7b6954/190296940323.jpg/632x632bb.webp',
		title: 'title',
		atmosphereRating: 1,
		bitsRating: 1,
		textRating: 1,
		tracksRating: 1
	}
];

export const Default: Story = {
	args: {
		albums: mockedAlbums
	}
};

export const WithoutAlbums: Story = {
	args: {
		albums: []
	}
};

export const Loading: Story = {
	args: {
		isLoading: true
	}
};

export const Error: Story = {
	args: {
		error: 'Ошибка!'
	}
};
