import { StoryFn } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { albumFormReducer } from 'features/AddAlbum';
import { loginReducer } from 'features/AuthByUsername';
import { registrationReducer } from 'features/RegistrationByUsername';
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const defaultAsyncReducers: ReducerList = {
	loginForm: loginReducer,
	albumForm: albumFormReducer,
	registrationForm: registrationReducer
};

export const StoreDecorator = (
	state: DeepPartial<StateSchema>,
	asyncReducers?: ReducerList,
	// eslint-disable-next-line react/display-name
) => (StoryComponent: StoryFn) => (
	<StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
		<StoryComponent />
	</StoreProvider>
);
