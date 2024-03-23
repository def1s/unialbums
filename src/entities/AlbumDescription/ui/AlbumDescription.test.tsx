import { render, screen } from '@testing-library/react';
import { AlbumDescription } from './AlbumDescription';
import { MemoryRouter } from 'react-router-dom';

describe('AlbumDescription', () => {
	test('render album title correctly', () => {
		const props = {
			cover: 'https://example.com/cover.jpg',
			title: 'Album Title',
			artist: 'Artist Name',
			year: 2022,
			rating: 5
		};
		render(<MemoryRouter><AlbumDescription {...props} /></MemoryRouter>);
		expect(screen.getByText('Album Title')).toBeInTheDocument();
	});

	test('render album artist correctly', () => {
		const props = {
			cover: 'https://example.com/cover.jpg',
			title: 'Album Title',
			artist: 'Artist Name',
			year: 2022,
			rating: 5
		};
		render(<MemoryRouter><AlbumDescription {...props} /></MemoryRouter>);
		expect(screen.getByText('Artist Name')).toBeInTheDocument();
	});

	test('render album year correctly', () => {
		const props = {
			cover: 'https://example.com/cover.jpg',
			title: 'Album Title',
			artist: 'Artist Name',
			year: 2022,
			rating: 5
		};
		render(<MemoryRouter><AlbumDescription {...props} /></MemoryRouter>);
		expect(screen.getByText('2022')).toBeInTheDocument();
	});

	test('render album rating correctly', () => {
		const props = {
			cover: 'https://example.com/cover.jpg',
			title: 'Album Title',
			artist: 'Artist Name',
			year: 2022,
			rating: 5
		};
		render(<MemoryRouter><AlbumDescription {...props} /></MemoryRouter>);
		expect(screen.getByText('5')).toBeInTheDocument();
	});

	test('truncate long title', () => {
		const props = {
			cover: 'https://example.com/cover.jpg',
			title: 'Very Long Album Title That Exceeds The Limit, Very Long Album Title That Exceeds The Limit',
			artist: 'Artist Name',
			year: 2022,
			rating: 5
		};
		render(<MemoryRouter><AlbumDescription {...props} /></MemoryRouter>);
		expect(screen.getByText('Very Long Album Title That...')).toBeInTheDocument();
	});

	test('render "Неизвестно" for empty title', () => {
		const props = {
			cover: 'https://example.com/cover.jpg',
			title: '',
			artist: 'Artist Name',
			year: 2022,
			rating: 5
		};
		render(<MemoryRouter><AlbumDescription {...props} /></MemoryRouter>);
		expect(screen.getByText('Неизвестно')).toBeInTheDocument();
	});
});
