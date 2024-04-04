import { ReactNode } from 'react';
import { configureReduxStore } from '../config/store';
import { Provider } from 'react-redux';
import { StateSchema } from '../config/StateSchema';

interface StoreProviderProps {
    children: ReactNode;
	initialState?: StateSchema;
}

// export const store = configureReduxStore();
// export type AppDispatch = typeof store.dispatch;

export const StoreProvider = ({ children, initialState }: StoreProviderProps) => {
	const store = configureReduxStore(initialState);

	return (
		<Provider store={store}>
			{children}
		</Provider>
	);
};
