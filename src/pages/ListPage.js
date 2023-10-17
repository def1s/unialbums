import { useState, useEffect, useMemo, useCallback } from "react";
import useAlbumsServices from "../services/AlbumsServices";

import Header from "../components/header/Header";
import List from '../components/list/List';
import Modal from '../components/modal/Modal'
import Loading from "../components/loading/Loading";
import Interaction from "../components/interaction/Interaction";

const ListPage = () => {
	const [albums, setAlbums] = useState([]); //текущие альбомы, полученные из базы данных
	const [searchStr, setSearchStr] = useState(''); //строка поиска, по умолчанию пуста
	const [modal, setModal] = useState(false); //модальное окно, по-умолчанию скрыто
	const [filter, setFilter] = useState('RESET'); //фильтр

	const {loading, error, getAlbums} = useAlbumsServices();

	useEffect(() => { //при рендере компонента будем получать альбомы для рендера
		loadingAlbums();
	}, []);

	const onSearch = (albums, tmp) => { //проводит фильтрацию входящих альбомов, по умолчанию проходят все
		const visibleAlbums = []; //новые альбомы

		for (let album of albums) {
			if (album.title.toUpperCase().indexOf(tmp.toUpperCase()) !== -1) { //если содержится - пропускаем
				visibleAlbums.push(album);
			}
		}

		return visibleAlbums; //возвращаем альбомы, прошедшие проверку на содержание строки
	}

	const onChangeInputSearch = useCallback((e) => { //ф-я реагирует на изменение строки для поиска
		setSearchStr(e.target.value); //изменяет стейт строки для поиска и запускает перерендер компонента
	}, []);

	const onSelectFilter = useCallback((e) => { //на изменение фильтра
		setFilter(e.target.innerText);
	}, []);
	
	const onHandleModal = useCallback(() => { //открытие модального окна
		setModal(modal => !modal);
	}, []);

	const onFilter = useCallback((data) => { //оптимизация, мемоизируем функцию на переменную filter
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
	}, [filter]);

	const loadingAlbums = () => {
		getAlbums('/albums-db')
			.then(response => setAlbums(response));
	}

	const visibleAlbums = useMemo(() => { //оптимизация, будем получать новый список только при изменении переменных в массиве
		onFilter(onSearch(albums, searchStr));
	}, [albums, searchStr, onFilter]);

	const content = !loading && !error ? <List albums={visibleAlbums}/> : null;
	const isLoading = loading && !error ? <Loading/> : null;
	//добавить сообщение об ошибке

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