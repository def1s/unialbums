import type { Meta, StoryObj } from '@storybook/react';
import { SearchList } from './SearchList';

const meta: Meta<typeof SearchList> = {
	title: 'entities/SearchList',
	component: SearchList
};

export default meta;
type Story = StoryObj<typeof SearchList>;

export const Default: Story = {
	args: {
		items: [
			{
				title: 'title',
				cover: 'https://avatars.yandex.net/get-music-content/5496390/e9ae50ee.a.21527303-1/m1000x1000',
				artists: ['Artist'],
				id: '1'
			},
			{
				title: 'title',
				cover: 'https://avatars.yandex.net/get-music-content/5496390/e9ae50ee.a.21527303-1/m1000x1000',
				artists: ['Artist'],
				id: '2'
			},
			{
				title: 'title',
				cover: 'https://avatars.yandex.net/get-music-content/5496390/e9ae50ee.a.21527303-1/m1000x1000',
				artists: ['Artist'],
				id: '3'
			}
		]
	}
};

export const Loading: Story = {
	args: {
		items: [],
		isLoading: true
	}
};
