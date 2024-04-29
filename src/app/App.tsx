import React, { useEffect } from 'react';
import './styles/index.scss';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { useSelector } from 'react-redux';
import { getUserAuthData, getUserInited, userInitAuthData } from 'entities/User';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

const App = () => {
	const dispatch = useAppDispatch();
	const user = useSelector(getUserAuthData);
	const inited = useSelector(getUserInited);

	useEffect(() => {
		dispatch(userInitAuthData());
	}, [dispatch]);

	// TODO Добавить isLoading и error в схему пользователя для уведомления пользователя о инициализации приложения

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
						</>
					}
				</div>
			</div>
		</div>
	);
};

export default App;
