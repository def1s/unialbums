import './app.scss';
import '../../bootstrap-reboot.min.css';
import '../../sass/media.scss';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ListPage, SingleAlbumPage, MainPage } from '../pages';

import Header from '../header/Header';

export default function App() {
	return (
		<div className="app">

			<Router>
				<Header/>

				<main>
					<Routes>
						<Route path={'/'} element={<MainPage/>}/>

						<Route path={'/albums'} element={<ListPage/>}/>

						<Route path={'/albums/:albumId'} element={<SingleAlbumPage/>}/>

						<Route path={'*'} element={<div>404</div>}/> {/* дописать */}
					</Routes>
				</main>

			</Router>

		</div>
	)
}