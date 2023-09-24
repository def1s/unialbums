import './header.scss';

import Filter from '../filters/Filter';

export default function Header({onChangeInputSearch, searchStr, onOpenModal, onSelectFilter, activeFilter}) {
	return (
		<header className="header">
			<div className="container">
				<Filter 
					onSelectFilter={onSelectFilter}
					activeFilter={activeFilter}
				/>
				<div className="header__wrapper">
					<button className='add-album-button' onClick={onOpenModal}>ДОБАВИТЬ АЛЬБОМ</button>

					<input 
						type="text" 
						placeholder='Поиск альбома' 
						className='search'
						onChange={(e) => onChangeInputSearch(e)}
						value={searchStr}
					/>
				</div>

			</div>
		</header>
	);
}