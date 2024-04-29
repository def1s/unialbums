import type { Meta, StoryObj } from '@storybook/react';
import { ProfileField } from './ProfileField';

const meta: Meta<typeof ProfileField> = {
	title: 'entities/ProfileField',
	component: ProfileField
};

export default meta;
type Story = StoryObj<typeof ProfileField>;

export const Readonly: Story = {
	args: {
		label: 'Какое-то поле',
		fieldValue: 'Его значение',
		readonly: true
	}
};

export const Changeable: Story = {
	args: {
		label: 'Какое-то поле',
		fieldValue: 'Его значение'
	}
};
