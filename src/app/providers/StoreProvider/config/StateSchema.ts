import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';

export interface StateSchema {
	user: UserSchema;
	login: LoginSchema;
}
