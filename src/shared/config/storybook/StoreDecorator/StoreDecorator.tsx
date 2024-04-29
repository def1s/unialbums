import { StoryFn } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { albumFormReducer } from 'features/AddAlbum';
import { registrationReducer } from 'features/RegistrationByUsername';

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
