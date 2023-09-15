import './modal.scss';
import cross from '../../img/cross.png';

import AlbumsServices from '../../services/AlbumsServices';
import { useState } from 'react';

export default function Modal({onCloseModal}) {
	const [img, setImg] = useState('');

	const onAddAlbum = (e) => {	
		e.preventDefault();

		const albumServices = new AlbumsServices();
		const album = {
			cover: e.target.cover.value,
			title: e.target.title.value,
			artist: e.target.artist.value,
			rating: e.target.rating.value
		}

		albumServices.postAlbum('http://localhost:3030/albums', album);
		e.target.reset();
		setImg('');
	}

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
						<input type="text" className="form__input" name='title' placeholder='Вмещает 16 символов'/>
					</div>

					<div className="form__wrapper">
						<div className="form__descr">ИСПОЛНИТЕЛЬ:</div>
						<input type="text" className="form__input" name='artist' placeholder='Что угодно'/>
					</div>

					<div className="form__wrapper">
						<div className="form__descr">РЕЙТИНГ:</div>
						<input type="text" className="form__input" name='rating' placeholder='Число от 1 до 100'/>
					</div>

					<button className="submit">ОТПРАВИТЬ</button>
				</form>
				<div className="modal__cover">
					<img src={img} alt="" />
				</div>
			</div>
		</div>
	);
}