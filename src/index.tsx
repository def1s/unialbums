import App from './app/App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from 'app/providers/StoreProvider';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
	<StoreProvider>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</StoreProvider>
);
