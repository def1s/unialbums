import { render, screen } from '@testing-library/react';
import { AlbumDescription } from './AlbumDescription';
import { MemoryRouter } from 'react-router-dom';
import { IAlbum } from 'entities/Albums';

describe('AlbumDescription', () => {
	test('render album title correctly', () => {
		const album: IAlbum = {
			cover: 'https://example.com/cover.jpg',
			title: 'Album Title',
			artist: 'Artist Name',
			albumId: 1,
			tracksRating: 1,
			textRating: 1,
			bitsRating: 1,
			atmosphereRating: 1
		};
		render(<MemoryRouter><AlbumDescription data={album} /></MemoryRouter>);
		expect(screen.getByText('Album Title')).toBeInTheDocument();
	});

	test('render album artist correctly', () => {
		const album: IAlbum = {
			cover: 'https://example.com/cover.jpg',
			title: 'Album Title',
			artist: 'Artist Name',
			albumId: 1,
			tracksRating: 1,
			textRating: 1,
			bitsRating: 1,
			atmosphereRating: 1
		};
		render(<MemoryRouter><AlbumDescription data={album} /></MemoryRouter>);
		expect(screen.getByText('Artist Name')).toBeInTheDocument();
	});

	// test('truncate long title', () => {
	// 	const props = {
	// 		cover: 'https://example.com/cover.jpg',
	// 		title: 'Very Long Album Title That Exceeds The Limit, Very Long Album Title That Exceeds The Limit',
	// 		artist: 'Artist Name',
	// 		year: 2022,
	// 		rating: 5
	// 	};
	// 	render(<MemoryRouter><AlbumDescription {...props} /></MemoryRouter>);
	// 	expect(screen.getByText('Very Long Album Title That...')).toBeInTheDocument();
	// });
	//
	// test('render "Неизвестно" for empty title', () => {
	// 	const props = {
	// 		cover: 'https://example.com/cover.jpg',
	// 		title: '',
	// 		artist: 'Artist Name',
	// 		year: 2022,
	// 		rating: 5
	// 	};
	// 	render(<MemoryRouter><AlbumDescription {...props} /></MemoryRouter>);
	// 	expect(screen.getByText('Неизвестно')).toBeInTheDocument();
	// });
});
