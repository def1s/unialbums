import './list.scss';

import { Link } from 'react-router-dom';

export default function List(props) {
	return (
		<main className="list">
			<div className="container">

				<div className="list__content">

					{
						props.albums.map(({title, artist, rating, cover, id}) => {
							if (title.length >= 16) {
								title = title.slice(0, 16);
								title += '...';
							}
							
							let stylez = {};
							if (rating > 85) {
								stylez = {'backgroundColor': '#FF3300'};
							}

							return (
								<Link to={`${id}`} className="list__item" key={id}>
									<div className="list__item-img">
										<img src={cover} alt="Обложка альбома"/>
									</div>
									<div className="list__item-title-album">{title}</div>
									<div className="list__item-artist">{artist}</div>
									<div className="divinder"></div>
									<div className="list__item-rating" style={stylez}>{rating}</div>
								</Link>
							);
						})
					}

				</div>
			</div>
		</main>
	);
}