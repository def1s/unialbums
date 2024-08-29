import type { Meta, StoryObj } from '@storybook/react';
import { EditableAlbumRating } from './EditableAlbumRating';

const meta: Meta<typeof EditableAlbumRating> = {
	title: 'entities/EditableAlbumRating',
	component: EditableAlbumRating
};

export default meta;
type Story = StoryObj<typeof EditableAlbumRating>;

export const Default: Story = {
	args: {}
};
