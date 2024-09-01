import type { Preview } from '@storybook/react';
import '../../src/app/styles/index.scss';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { MemoryRouter } from 'react-router-dom';
import { StoreProvider } from '../../src/app/providers/StoreProvider';

initialize({
	onUnhandledRequest: 'bypass'
});

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		}
	},
	loaders: [mswLoader],
	decorators: [
		(Story) => (
			<MemoryRouter>
				<Story/>
			</MemoryRouter>
		),
		(Story) => (
			<StoreProvider>
				<Story/>
			</StoreProvider>
		)
	]
};

export default preview;
