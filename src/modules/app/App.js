import { useState, useEffect } from "react";

import Header from "../header/Header";
import List from "../list/List";
import AlbumsServices from "../../services/AlbumsServices";
import Modal from "../modal/Modal";

import './app.scss';
import '../../bootstrap-reboot.min.css';

export default function App() {
	const [albums, setAlbums] = useState([]);
	const [searchStr, setSearchStr] = useState('');
	const [modal, setModal] = useState(false);
	const [filter, setFilter] = useState('СБРОС');

	const onChangeInputSearch = (e) => {
		setSearchStr(e.target.value);
	};

	const onSearch = (albums, tmp) => {
		const visibleAlbums = [];

		for (let album of albums) {
			if (album.title.toUpperCase().indexOf(tmp.toUpperCase()) !== -1) {
				visibleAlbums.push(album);
			}
		}

		return visibleAlbums;
	}

	const onSelectFilter= (e) => {
		setFilter(e.target.innerText);
	}
	
	const onHandleModal = () => {
		setModal(modal => !modal);
	}

	const onFilter = (data) => {
		switch(filter) {
			case 'ЛУЧШЕЕ':
				return data.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
			case 'ХУДШЕЕ':
				return data.sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating));
			case 'ПО_ИСПОЛНИТЕЛЮ':
				return data.sort((a, b) => {
					if (a.artist > b.artist) {
						return -1;
					}
					if (a.artist < b.artist) {
						return 1;
					}
					return 0;
				});
			case 'ПО_АЛФАВИТУ':
				return data.sort((a, b) => {
					if (a.title > b.title) {
						return 1;
					}
					if (a.title < b.title) {
						return -1;
					}
					return 0;
				});
			default:
				return data;
		}
	}

	useEffect(() => {
		loadingAlbums();

		/* const albumServices = new AlbumsServices(); //вынести в отдельную функцию
		albumServices.getAlbums('http://localhost:3030/albums')
			.then(response => setAlbums(response)); //добавить catch */

	}, []);

	const loadingAlbums = () => {
		const albumServices = new AlbumsServices(); //вынести в отдельную функцию
		albumServices.getAlbums('http://localhost:3030/albums')
			.then(response => setAlbums(response)); //добавить catch

	}

	const visibleAlbums = onFilter(onSearch(albums, searchStr));

	return (
		<>
			<Header 
				onChangeInputSearch={onChangeInputSearch} 
				searchStr={searchStr}
				onOpenModal={onHandleModal}
				onSelectFilter={onSelectFilter}
				activeFilter={filter}
			/>
			<List albums={visibleAlbums}/>
			
			{modal ? <Modal onCloseModal={onHandleModal} loadingAlbums={loadingAlbums}/> : null}
		</>
	);
}