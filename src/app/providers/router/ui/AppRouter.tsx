import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { routerConfig } from 'shared/config/routerConfig/routerConfig';


export const AppRouter = () => {

	return (
		<Routes>
			{
				Object.values(routerConfig).map(({ path, element }) => (
					<Route
						key={path}
						path={path}
						element={
							<Suspense fallback={'Loading...'}>
								<div className={'page-wrapper'}>
									{element}
								</div>
							</Suspense>
						}
					/>
				))
			}
		</Routes>
	);
};
