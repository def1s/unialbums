import React, { useEffect } from 'react';
import './styles/index.scss';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';

const App = () => {
	const dispatch = useDispatch();
	const user = useSelector(getUserAuthData);

	useEffect(() => {
		dispatch(userActions.iniAuthData());
	}, [dispatch]);

	if (user) {
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
	} else {
		return (
			<div className={'App'}>
				<div className="welcome-page">
					<Navbar/>
					<AppRouter/>
				</div>
			</div>
		);
	}
};

export default App;
