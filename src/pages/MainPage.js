import './mainPage.scss';

import { Link } from 'react-router-dom';

import image from '../img/collage.JPEG';

const MainPage = () => {
	return (
		<>
{/* 			<header class="header">
				<div class="container">

					<div class="header__wrapper">



					</div>

				</div>
			</header> */}

			<section class="main">
				<div class="container">
					<div className="background">
						<img src={image} alt="" />
					</div>
					<div class="main__wrapper">
						<Link to={'/albums'} class="main__card">
							<div class="main__card-content">
								<div class="main__card-label">
									АЛЬБОМЫ
								</div>
							</div>
						</Link>
						<Link to={'/artists'} class="main__card">
							<div class="main__card-content">
								<div class="main__card-label">
									ИСПОЛНИТЕЛИ
								</div>
							</div>
						</Link>
					</div>
				</div>
			</section>
		</>
	)
}

export default MainPage;