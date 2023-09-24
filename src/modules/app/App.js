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
			default:
				return data;
		}
	}

	useEffect(() => {

		const albumServices = new AlbumsServices(); //вынести в отдельную функцию
		albumServices.getAlbums('http://localhost:3030/albums')
			.then(response => setAlbums(response)); //добавить catch

	}, []);

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
			
			{modal ? <Modal onCloseModal={onHandleModal}/> : null}
		</>
	);
}