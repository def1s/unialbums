import './list.scss';

export default function List(props) {
	return (
		<main class="list">
			<div class="container">

				<div class="list__content">

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
								<div class="list__item" key={id}>
									<img src={cover} alt=""/>
									<div class="list__item-title-album">{title}</div>
									<div class="list__item-artist">{artist}</div>
									<div class="list__item-rating" style={stylez}>{rating}</div>
								</div>
							);
						})
					}

				</div>
			</div>
		</main>
	);
}