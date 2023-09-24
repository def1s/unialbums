import './list.scss';

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
								stylez = {'background-color': '#FF3300'};
							}

							return (
								<div className="list__item" key={id}>
									<div className="list__item-img">
										<img src={cover} alt="Обложка альбома"/>
									</div>
									<div className="list__item-title-album">{title}</div>
									<div className="list__item-artist">{artist}</div>
									<div className="list__item-rating" style={stylez}>{rating}</div>
								</div>
							);
						})
					}

				</div>
			</div>
		</main>
	);
}