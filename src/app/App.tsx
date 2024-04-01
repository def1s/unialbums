import React, { useEffect } from 'react';
import './styles/index.scss';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, getUserInited, userActions } from 'entities/User';
import { classNames } from 'shared/lib/classNames/classNames';

const App = () => {
	const dispatch = useDispatch();
	const user = useSelector(getUserAuthData);
	const inited = useSelector(getUserInited);

	useEffect(() => {
		dispatch(userActions.iniAuthData());
	}, [dispatch]);

	return (
		<div className='App'>
			<div className={classNames('', { 'content-page': !!user })}>
				{user && <Sidebar/>}
				<div
					className={classNames('', { 'content-wrapper': !!user, 'welcome-page': !user })}
				>
					<Navbar/>
					{inited && <AppRouter/>}
				</div>
			</div>
		</div>
	);
};

export default App;
