import './modal.scss';
import '../list/list.scss';
import cross from '../../img/cross.png';

import useAlbumsServices from '../../services/AlbumsServices';
import Loading from '../loading/Loading';

import { useState, useEffect } from 'react';

export default function Modal({onCloseModal, loadingAlbums}) {
	const [img, setImg] = useState('');
	const [title, setTitle] = useState('НАЗВАНИЕ');
	const [artist, setArtist] = useState('ИСПОЛНИТЕЛЬ');

	const [likedTracksRating, setLikedTracksRating] = useState(0);
	const [currentAtmosphereRating, setCurrentAtmosphereRating] = useState(0);
	const [currentBitsRating, setCurrentBitsRating] = useState(0);
	const [currentTextRating, setCurrentTextRating] = useState(0);
	const [finalRating, setFinalRating] = useState(0);

	const {postAlbum, loading, error} = useAlbumsServices();

	useEffect(() => {
		const multiplier = 8/3;
		const rating = Math.floor(
			(likedTracksRating + 1) * multiplier * 2 + (currentAtmosphereRating + 1) * multiplier + (currentBitsRating + 1) + (currentTextRating + 1)
		);
		setFinalRating(rating);
	}, [likedTracksRating, currentAtmosphereRating, currentBitsRating, currentTextRating]);

	const onAddAlbum = (e) => {	 //добавить проверку на пустые поля
		e.preventDefault();

		const album = {
			cover: e.target.cover.value,
			title: e.target.title.value,
			artist: e.target.artist.value,
			tracksRating: likedTracksRating,
			atmosphereRating: currentAtmosphereRating,
			bitsRating: currentBitsRating,
			textRating: currentTextRating,
			rating: finalRating,
			likedTracks: []
		}

		postAlbum('/albums-db', JSON.stringify(album));
		e.target.reset();
		setImg(''); //при сбросе картинки часть ее остается
		setCurrentAtmosphereRating(0); //добавить сброс полей ввода
		setLikedTracksRating(0);
		setCurrentBitsRating(0);
		setCurrentTextRating(0);

		loadingAlbums();
	}

	const onChangeTitle = (e) => {
		setTitle(e.target.value.toUpperCase());
	}

	const onChangeArtist = (e) => {
		setArtist(e.target.value.toUpperCase());
	}

	//сделать функцию для создания таких массивов
	let countOfLikedTracksRating = [];
	let atmosphereRating = [];
	let bitsRating = [];
	let textRating = [];

	for (let i = 0; i < 10; i++) {
		countOfLikedTracksRating.push(<div 
			className={i <= likedTracksRating ? "form__rate-item form__rate-item_hover" : "form__rate-item" }
			key={i} 
			onMouseDown={() => setLikedTracksRating(i)}
		></div>);

		atmosphereRating.push(<div 
			className={i <= currentAtmosphereRating ? "form__rate-item form__rate-item_hover" : "form__rate-item" }
			key={i} 
			onMouseDown={() => setCurrentAtmosphereRating(i)}
		></div>);

		bitsRating.push(<div 
			className={i <= currentBitsRating ? "form__rate-item form__rate-item_hover" : "form__rate-item" }
			key={i} 
			onMouseDown={() => setCurrentBitsRating(i)}
		></div>)

		textRating.push(<div 
			className={i <= currentTextRating ? "form__rate-item form__rate-item_hover" : "form__rate-item" }
			key={i} 
			onMouseDown={() => setCurrentTextRating(i)}
		></div>)
	}

	const preview = !loading && !error ? <Preview img={img} title={title} artist={artist} finalRating={finalRating}/> : null;
	const isLoading = loading && !error ? <Loading/> : null;

	return (
		<div className="modal">
			<div className="modal__content">

				<div className="modal__close" onClick={onCloseModal}>
					<img src={cross} alt=""/>
				</div>

				<form action="#" className="form" onSubmit={(e) => onAddAlbum(e)}>
					<div className="form__title">ДОБАВЛЕНИЕ АЛЬБОМА</div>
					
					<div className="form__wrapper">
						<div className="form__descr">ОБЛОЖКА:</div>
						<input 
							type="text" 
							className="form__input" 
							name='cover' 
							onChange={(e) => setImg(e.target.value)} 
							value={img}
							placeholder='URL картинки'
						/>
					</div>

					<div className="form__wrapper">
						<div className="form__descr">НАЗВАНИЕ:</div>
						<input 
							type="text" 
							className="form__input" 
							name='title'
							placeholder='Вмещает 16 символов'
							value={title}
							onChange={(e) => onChangeTitle(e)}
						/>
					</div>

					<div className="form__wrapper">
						<div className="form__descr">ИСПОЛНИТЕЛЬ:</div>
						<input 
							type="text" 
							className="form__input" 
							name='artist' 
							placeholder='Что угодно'
							value={artist}
							onChange={(e) => onChangeArtist(e)}
						/>
					</div>

					<div className="form__wrapper">
						<div className="form__descr">ЗАШЕДШИЕ ТРЕКИ:</div>
						<div className="form__rate">
							{
								countOfLikedTracksRating
							}
							<div className="form__rate-value">{likedTracksRating + 1}</div>
						</div>
					</div>

					<div className="form__wrapper">
						<div className="form__descr">АТМОСФЕРА:</div>
						<div className="form__rate">
							{
								atmosphereRating
							}
							<div className="form__rate-value">{currentAtmosphereRating + 1}</div>
						</div>
					</div>

					<div className="form__wrapper">
						<div className="form__descr">БИТЫ:</div>
						<div className="form__rate">
							{
								bitsRating
							}
							<div className="form__rate-value">{currentBitsRating + 1}</div>
						</div>
					</div>

					<div className="form__wrapper">
						<div className="form__descr">ТЕКСТА:</div>
						<div className="form__rate">
							{
								textRating
							}
							<div className="form__rate-value">{currentTextRating + 1}</div>
						</div>
					</div>

					<button className="submit">ОТПРАВИТЬ</button>
				</form>
				<div className="modal__cover">
					{preview}
					{isLoading}
					{/* <div className="list__item list__item_scope-off">
						<div className="list__item-img">
							<img src={img} alt="Обложка альбома"/>
						</div>
						<div className="list__item-title-album">{title.length > 16 ? title.slice(0, 16) + '...' : title}</div>
						<div className="list__item-artist">{artist.length > 20 ? artist.slice(0, 20) + '...' : artist}</div>
						<div className="list__item-rating" >{finalRating}</div>
					</div> */}
				</div>
			</div>
		</div>
	);
}

const Preview = ({img, title, artist, finalRating}) => {
	return (
		<div className="list__item list__item_scope-off list__item_margin-off">
			<div className="list__item-img">
				<img src={img} alt="Обложка альбома"/>
			</div>
			<div className="list__item-title-album">{title.length > 16 ? title.slice(0, 16) + '...' : title}</div>
			<div className="list__item-artist">{artist.length > 20 ? artist.slice(0, 20) + '...' : artist}</div>
			<div className="list__item-rating" >{finalRating}</div>
		</div>
	)
} 