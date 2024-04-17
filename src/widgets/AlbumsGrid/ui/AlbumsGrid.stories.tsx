import type { Meta, StoryObj } from '@storybook/react';
import { AlbumsGrid } from './AlbumsGrid';
import { Album } from 'entities/Albums';
import { rest } from 'msw';
import { ApiResponse } from 'shared/api/types/apiResponse';

const meta: Meta<typeof AlbumsGrid> = {
	title: 'widgets/AlbumsGrid',
	component: AlbumsGrid
};

export default meta;
type Story = StoryObj<typeof AlbumsGrid>;

const mockedAlbums: ApiResponse<Album> = {
	data:
		[
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
		],
	message: 'Ok'
};

const mockedEmptyAlbums: ApiResponse<null> = {
	data: [],
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

export const Error: Story = {
	parameters: {
		msw: {
			handlers: [
				rest.get('http://localhost:8081/albums/getByUserId', (req, res, ctx) => {
					return res(
						ctx.status(404)
					);
				}),
			]
		},
	}
};
