import type { Meta, StoryObj } from '@storybook/react';
import HomePage from './HomePage';
import { rest } from 'msw';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { Album } from 'entities/Albums';

const meta: Meta<typeof HomePage> = {
	title: 'pages/HomePage',
	component: HomePage,
};

export default meta;
type Story = StoryObj<typeof HomePage>;

const mockedAlbums: ApiResponse<Album> = {
	data:
		[
			{
				albumId: 1,
				artist: 'artist',
				cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/b8/42/74/b8427409-1c8f-5c8a-dee2-82a4ed7b6954/190296940323.jpg/632x632bb.webp',
				title: 'title'
			},
			{
				albumId: 2,
				artist: 'artist',
				cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/b8/42/74/b8427409-1c8f-5c8a-dee2-82a4ed7b6954/190296940323.jpg/632x632bb.webp',
				title: 'title'
			},
			{
				albumId: 3,
				artist: 'artist',
				cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/b8/42/74/b8427409-1c8f-5c8a-dee2-82a4ed7b6954/190296940323.jpg/632x632bb.webp',
				title: 'title'
			}
		],
	message: 'Ok'
};

const mockedEmptyAlbums: ApiResponse<null> = {
	data: null,
	message: 'Empty'
};

export const Default: Story = {
	parameters: {
		msw: {
			handlers: [
				rest.get('http://localhost:8081/albums/getByUserId', (req, res, ctx) => {
					return res(
						ctx.json(mockedAlbums)
					);
				}),
			]
		},
	}
};

export const WithoutAlbums: Story = {
	parameters: {
		msw: {
			handlers: [
				rest.get('http://localhost:8081/albums/getByUserId', (req, res, ctx) => {
					return res(
						ctx.json(mockedEmptyAlbums)
					);
				}),
			]
		},
	}
};
