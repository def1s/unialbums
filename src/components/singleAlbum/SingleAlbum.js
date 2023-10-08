import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import useAlbumsServices from "../../services/AlbumsServices";
import Loading from "../loading/Loading";

import './singleAlbum.scss';

const SingleAlbum = () => {
	const [album, setAlbum] = useState({});
	const {albumId} = useParams();
	const {getAlbums, loading, error} = useAlbumsServices();

	console.log('render!');

	useEffect(() => {
		getAlbums(`http://localhost:3131/albums/${albumId}`)
			.then(response => setAlbum(response));
	}, []);

	const isLoading = loading && !error ? <Loading/> : null;
	const content = !loading && !error ? <View album={album}/> : null;

	return (
		<>
			{isLoading}
			{content}
		</>
	)
}

const View = ({album}) => {
	return (
		<>
			<section className="single-album">
				<div className="single-album__background">
					<img src={album.cover} alt="" />
				</div>

				<div class="container">

					<div class="single-album__wrapper">

						<div class="single-album__cover">
							<img src={album.cover} alt=""></img>
						</div>

						<div class="single-album__descr">

							<div class="single-album__title">{album.title}</div>
							<div class="single-album__artist">{album.artist}</div>
							<div class="single-album__rating">{album.rating}</div>

						</div>

					</div>

				</div>
			</section>

			<section class="liked-tracks">
				<div class="container">

					<div class="liked-tracks__wrapper">
						
						<div class="liked-tracks__list">
							<div class="liked-tracks__label">Зашедшие треки:</div>
							<div class="liked-tracks__items">

								<div class="liked-tracks__item">ПЛАТИНА - Опиаты. Круг</div>
								<div class="liked-tracks__item">ПЛАТИНА - MJ</div>
								<div class="liked-tracks__item">ПЛАТИНА, OBLADAET - Бентли, Бенз и Бумер</div>
								<div class="liked-tracks__item">ПЛАТИНА - Санта Клаус</div>

							</div>
						</div>

						<div class="liked-tracks__best-track-wrapper">
							лучший трек
						</div>

					</div>

				</div>
			</section>

		</>
	);
}

export default SingleAlbum;