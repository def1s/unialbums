import React from 'react';
import './styles/index.scss';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';

const App = () => {
	return (
		<div className={'App'}>
			<Navbar/>
			<div className="content-wrapper">
				<AppRouter/>
			</div>
		</div>
	);
};

export default App;
