import { useState, useEffect } from "react";
import useAlbumsServices from "../services/AlbumsServices";

import Header from "../components/header/Header";
import List from '../components/list/List';
import Modal from '../components/modal/Modal'
import Loading from "../components/loading/Loading";
import Interaction from "../components/interaction/Interaction";

const ListPage = () => {
	const [albums, setAlbums] = useState([]);
	const [searchStr, setSearchStr] = useState('');
	const [modal, setModal] = useState(false);
	const [filter, setFilter] = useState('RESET');

	const {loading, error, getAlbums} = useAlbumsServices();

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

	const onSelectFilter = (e) => {
		setFilter(e.target.innerText);
	}
	
	const onHandleModal = () => {
		setModal(modal => !modal);
	}

	const onFilter = (data) => {
		switch(filter) {
			case 'RATING↑':
				return data.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
			case 'RATING↓':
				return data.sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating));
			case 'ARTISTS':
				return data.sort((a, b) => {
					if (a.artist > b.artist) {
						return -1;
					}
					if (a.artist < b.artist) {
						return 1;
					}
					return 0;
				});
			case 'A-Z':
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
	}, []);

	const loadingAlbums = () => {
		getAlbums('/albums-db') //через прокси в package.json!!!!!!!!!!!!!!
			.then(response => setAlbums(response));
	}

	const visibleAlbums = onFilter(onSearch(albums, searchStr));

	const content = !loading && !error ? <List albums={visibleAlbums}/> : null;
	const isLoading = loading && !error ? <Loading/> : null;

	return (
		<>
			<Header 
				onChangeInputSearch={onChangeInputSearch}
				searchStr={searchStr}
			/>

			<Interaction onSelectFilter={onSelectFilter} onOpenModal={onHandleModal} activeFilter={filter}/>
			
			{content}
			{isLoading}
			
			{modal ? <Modal onCloseModal={onHandleModal} loadingAlbums={loadingAlbums}/> : null}
		</>
	);
}

export default ListPage;