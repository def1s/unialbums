import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from 'app/providers/StoreProvider';
import App from './app/App';

const domNode = document.getElementById('root');
const root = createRoot(domNode as HTMLElement);
root.render(
	<StoreProvider>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</StoreProvider>
);
