import type { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import avatar from 'shared/assets/storybook/avatar.jpg';
import { EditableUserProfile } from './EditableUserProfile';

const meta: Meta<typeof EditableUserProfile> = {
	title: 'features/EditableUserProfile',
	component: EditableUserProfile
};

export default meta;
type Story = StoryObj<typeof EditableUserProfile>;

export const Default: Story = {
	parameters: {
		msw: {
			handlers: [
				rest.get(`${__API_URL__}/users/myProfile`, (req, res, ctx) => {
					return res(
						ctx.json({
							data: [
								{
									username: 'username',
									firstName: 'firstName',
									lastName: 'lastName',
									avatar: avatar
								}
							]
						})
					);
				}),
			]
		}
	}
};
