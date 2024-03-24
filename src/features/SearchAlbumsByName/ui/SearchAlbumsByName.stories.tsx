import type { Meta, StoryObj } from '@storybook/react';
import { SearchAlbumsByName } from './SearchAlbumsByName';

const meta: Meta<typeof SearchAlbumsByName> = {
	title: 'features/SearchAlbumsByName',
	component: SearchAlbumsByName,
};

export default meta;
type Story = StoryObj<typeof SearchAlbumsByName>;

export const Default: Story = {};
