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

	}
};
