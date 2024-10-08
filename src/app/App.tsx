import React, { useEffect } from 'react';
import './styles/index.scss';
import { useSelector } from 'react-redux';
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { Notifications } from 'features/Notifications';
import { getUserAuthData, getUserInited, userInitAuthData } from 'entities/User';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

const App = () => {
	const dispatch = useAppDispatch();
	const user = useSelector(getUserAuthData);
	const inited = useSelector(getUserInited);

	useEffect(() => {
		dispatch(userInitAuthData());
		document.body.style.backgroundImage = `url(${__MINIO_URL__}/bg.png)`;
	}, [dispatch]);

	return (
		<div className='App'>
			<div className={classNames('', { 'content-page': !!user })}>
				{user && <Sidebar/>}
				<div
					className={classNames('', { 'content-wrapper': !!user, 'welcome-page': !user })}
				>
					{
						inited &&
						<>
							<Navbar/>
							<AppRouter/>
							<Notifications/>
						</>
					}
				</div>
			</div>
		</div>
	);
};

export default App;
