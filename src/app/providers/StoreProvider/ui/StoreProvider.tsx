import { ReducersMapObject } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { StateSchema } from '../config/StateSchema';
import { configureReduxStore } from '../config/store';

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
