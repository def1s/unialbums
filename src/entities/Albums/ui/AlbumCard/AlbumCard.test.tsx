import { render, screen } from '@testing-library/react';
import { AlbumCard } from './AlbumCard';
import { MemoryRouter } from 'react-router-dom';
import { Album } from 'entities/Albums';

describe('AlbumCard', () => {
	it('normal album title', () => {
		const props = {
			albumId: 1,
			cover: 'https://example.com/cover.jpg',
			title: 'Album Title',
			artist: 'Artist Name',
			rating: 5,
			atmosphereRating: 1,
			bitsRating: 1,
			textRating: 1,
			tracksRating: 1
		};
		render(<MemoryRouter><AlbumCard {...props} /></MemoryRouter>);
		expect(screen.getByText('Album Title')).toBeInTheDocument();
	});

	it('normal album artist', () => {
		const props = {
			albumId: 1,
			cover: 'https://example.com/cover.jpg',
			title: 'Album Title',
			artist: 'Artist Name',
			rating: 5,
			atmosphereRating: 1,
			bitsRating: 1,
			textRating: 1,
			tracksRating: 1
		};
		render(<MemoryRouter><AlbumCard {...props} /></MemoryRouter>);
		expect(screen.getByText('Artist Name')).toBeInTheDocument();
	});

	// it('normal album rating correctly', () => {
	// 	const props = {
	// 		albumId: 1,
	// 		cover: 'https://example.com/cover.jpg',
	// 		title: 'Album Title',
	// 		artist: 'Artist Name',
	// 		rating: 5
	// 	};
	// 	render(<MemoryRouter><AlbumCard {...props} /></MemoryRouter>);
	// 	expect(screen.getByText('5')).toBeInTheDocument();
	// });

	it('should truncate long title', () => {
		const props = {
			albumId: 1,
			cover: 'https://example.com/cover.jpg',
			title: 'Very Long Album Title That Exceeds The Limit',
			artist: 'Artist Name',
			rating: 5,
			atmosphereRating: 1,
			bitsRating: 1,
			textRating: 1,
			tracksRating: 1
		};
		render(<MemoryRouter><AlbumCard {...props} /></MemoryRouter>);
		expect(screen.getByText('Very Long Album ...')).toBeInTheDocument();
	});

	it('should render "Неизвестно" for empty title', () => {
		const props = {
			albumId: 1,
			cover: 'https://example.com/cover.jpg',
			title: '',
			artist: 'Artist Name',
			rating: 5,
			atmosphereRating: 1,
			bitsRating: 1,
			textRating: 1,
			tracksRating: 1
		};
		render(<MemoryRouter><AlbumCard {...props} /></MemoryRouter>);
		expect(screen.getByText('Неизвестно')).toBeInTheDocument();
	});

	it('should render "Неизвестно" for empty artist', () => {
		const props: Album = {
			albumId: 1,
			cover: 'https://example.com/cover.jpg',
			title: 'Album Title',
			artist: '',
			atmosphereRating: 1,
			bitsRating: 1,
			textRating: 1,
			tracksRating: 1
		};
		render(<MemoryRouter><AlbumCard {...props} /></MemoryRouter>);
		expect(screen.getByText('Неизвестно')).toBeInTheDocument();
	});
});
