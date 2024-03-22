import React from 'react';
import './styles/index.scss';
import { AppRouter } from 'app/providers/router';

const App = () => {
	return (
		<div className={'App'}>
			<AppRouter/>
		</div>
	);
};

export default App;
