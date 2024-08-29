import type { Meta, StoryObj } from '@storybook/react';
import { SearchField } from './SearchField';

const meta: Meta<typeof SearchField> = {
	title: 'entities/SearchField',
	component: SearchField
};

export default meta;
type Story = StoryObj<typeof SearchField>;

export const Default: Story = {
	args: {
		artists: ['JPEGMafia'],
		cover: 'https://avatars.yandex.net/get-music-content/5496390/e9ae50ee.a.21527303-1/m1000x1000',
		title: 'Offline!'
	}
};
