import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import useAlbumsServices from "../../services/AlbumsServices";
import Loading from "../loading/Loading";
import UserFeedback from "../userFeedback/UserFeedback";

import './singleAlbum.scss';

const SingleAlbum = () => {
	const [album, setAlbum] = useState({});
	const [likedTracks, setLikedTracks] = useState([]);
	const [showAddForm, setShowAddForm] = useState(false);
	const {albumId} = useParams();
	const {getAlbums, loading, error, postLikedTracks} = useAlbumsServices();

	useEffect(() => {
		getAlbums(`/albums-db/${albumId}`)
			.then(response => {
				setAlbum(response[0]);
				setLikedTracks(response[0].likedTracks === '' ? [] : response[0].likedTracks.split(';')); //проверка на пустую строку
			});
	}, []);

	const onClickAddForm = () => {
		setShowAddForm(true);
	}

	const onAddTrack = (e) => { //сделать одну функцию
		e.preventDefault();

		const newLikedTracks = [...likedTracks, e.target.track.value];
		setLikedTracks(newLikedTracks);

		const data = {
			newLikedTracks: newLikedTracks.join(';')
		}

		postLikedTracks(`/albums-db/${albumId}`, JSON.stringify(data));
		setShowAddForm(false);
	}

	const onDeleteTrack = (index) => { //сделать одну функцию
		const newLikedTracks = [...likedTracks.slice(0, index), ...likedTracks.slice(index + 1, likedTracks.length)];
		setLikedTracks(newLikedTracks);

		const data = {
			newLikedTracks: newLikedTracks.join(';')
		}

		postLikedTracks(`/albums-db/${albumId}`, JSON.stringify(data));
		setShowAddForm(false);
	}

	const isLoading = loading && !error ? <Loading/> : null;

	let content = null;
	if (!loading && !error) {
		content = <View 
			album={album} 
			likedTracks={likedTracks} 
			onDeleteTrack={onDeleteTrack} 
			showAddForm={showAddForm} 
			onClickAddForm={onClickAddForm}
			onAddTrack={onAddTrack}
		/>
	}

	return (
		<>
			{isLoading}
			{content}
		</>
	)
}

const View = ({album, likedTracks, onDeleteTrack, showAddForm, onClickAddForm, onAddTrack}) => { //подумать, стоит ли создать отдельный компонент под некоторые вещи
	const likedTracksOnPage = likedTracks.map((track, i) => {
		return (
			<div class="liked-tracks__item" key={i}>
				{track}
				<div className="cross" onClick={() => onDeleteTrack(i)}></div>
			</div>
		);
	});

	const input = (
		<form className="liked-tracks__form" onSubmit={onAddTrack}>
			<input type="text" className="liked-tracks__add-form" name="track"/>
			<button className="liked-tracks__add-confirm"></button>
		</form>
	);

	const addFormOnPage = showAddForm ? input : null;

	return (
		<>
			<div className="background">
					<img src={album.cover} alt="" />
			</div>

			<section className="content">
				<div className="album-info">

						<div class="album-info__card">

							<div class="album-info__cover">
								<img src={album.cover} alt=""></img>
							</div>

							<div class="album-info__descr">

								<div class="album-info__title">{album.title}</div>
								<div class="album-info__artist">{album.artist}</div>
								<div className="album-info__year">2018</div>
								<div class="album-info__rating">{album.rating}</div>

							</div>

						</div>

				</div>

				<div class="liked-tracks">
					<div class="liked-tracks__list">
						<div class="liked-tracks__label">Зашедшие треки:</div>
							<div class="liked-tracks__items">

								{likedTracksOnPage}
								{addFormOnPage}

								<button className="liked-tracks__add-button">
									Добавить трек
									<div className="cross cross_add" onClick={onClickAddForm}></div>
								</button>
							</div>
					</div>
				</div>

				<UserFeedback/>
				{/* <div className="wrapper">
					<UserFeedback/>
				</div> */}

			</section>

		</>
	);
}

export default SingleAlbum;