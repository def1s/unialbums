import { ReactNode } from 'react';
import { configureReduxStore } from '../config/store';
import { Provider } from 'react-redux';

interface StoreProviderProps {
    children: ReactNode;
}

export const store = configureReduxStore();
export type AppDispatch = typeof store.dispatch;

export const StoreProvider = ({ children }: StoreProviderProps) => {
	return (
		<Provider store={store}>
			{children}
		</Provider>
	);
};
