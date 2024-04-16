import { ReactNode } from 'react';
import { configureReduxStore } from '../config/store';
import { Provider } from 'react-redux';
import { StateSchema } from '../config/StateSchema';
import { ReducersMapObject } from '@reduxjs/toolkit';

interface StoreProviderProps {
    children: ReactNode;
	initialState?: DeepPartial<StateSchema>;
	asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export const StoreProvider = (props: StoreProviderProps) => {
	const {
		children,
		initialState,
		asyncReducers
	} = props;

	const store = configureReduxStore(
		initialState as StateSchema,
		asyncReducers as ReducersMapObject<StateSchema>
	);

	return (
		<Provider store={store}>
			{children}
		</Provider>
	);
};
