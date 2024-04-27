import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { AppRoutesProps, routerConfig } from 'shared/config/routerConfig/routerConfig';
import { useCallback } from 'react';
import { RequireAuth } from './RequireAuth';
import { Loader } from 'shared/ui/Loader/Loader';


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
