import type { Meta, StoryObj } from '@storybook/react';
import { PersonalProfileField } from './PersonalProfileField';

const meta: Meta<typeof PersonalProfileField> = {
	title: 'entities/PersonalProfileField',
	component: PersonalProfileField
};

export default meta;
type Story = StoryObj<typeof PersonalProfileField>;

export const Readonly: Story = {
	args: {
		label: 'Какое-то поле',
		fieldValue: 'Его значение',
	}
};

export const Changeable: Story = {
	args: {
		label: 'Какое-то поле',
		fieldValue: 'Его значение'
	}
};
