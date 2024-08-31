import { Suspense } from 'react';
import { useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutesProps, routerConfig } from 'shared/config/routerConfig/routerConfig';
import { Loader } from 'shared/ui/Loader/Loader';
import { RequireAuth } from './RequireAuth';


export const AppRouter = () => {
	const renderWithWrapper = useCallback((route: AppRoutesProps) => {
		const element = (
			<Suspense fallback={<Loader/>}>
				<div className="page-wrapper">
					{route.element}
				</div>
			</Suspense>
		);
		return (
			<Route
				key={route.path}
				path={route.path}
				element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
			/>
		);
	}, []);

	return (
		<Routes>
			{Object.values(routerConfig).map(renderWithWrapper)}
		</Routes>
	);
};
