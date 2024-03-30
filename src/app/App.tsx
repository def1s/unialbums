import React from 'react';
import './styles/index.scss';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';

const App = () => {
	return (
		<div className={'App'}>
			<div className="content-page">
				<Sidebar/>
				<div className="content-wrapper">
					<Navbar/>
					<AppRouter/>
				</div>
			</div>
		</div>
	);
};

export default App;
