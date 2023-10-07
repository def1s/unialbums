import { useState } from 'react';

import './filter.scss';

export default function Filter({onSelectFilter, activeFilter}) {
	const [showFilters, setShowFilters] = useState(false);
	const [filter, setFilter] = useState("ВЫБРАТЬ ФИЛЬТР");

	const onClickFilter = (e) => {
		onSelectFilter(e);
		setFilter(e.target.innerText);
	}

	const filters = ['reset', 'rating↑', 'rating↓', 'artists', 'A-Z'];
	const filtersOnPage = showFilters ? <View filters={filters} onSelectFilter={onSelectFilter} onClickFilter={onClickFilter} activeFilter={activeFilter}/> : null;

	let stylez = null;
	if (showFilters) { //cглаживаю углы, если меню выдвигается вниз для красоты
		stylez = {
			'borderBottomRightRadius': '0px',
			'borderBottomLeftRadius': '0px',
		}
	}

	return (
		<div className="filters" style={stylez}>

			<div className="filters__label" onClick={() => setShowFilters(showFilters => !showFilters)}>{filter}</div>

			{filtersOnPage}

		</div>
	);
}

const View = ({filters, onClickFilter, activeFilter}) => {

	const filtersOnPage = filters.map((filter, i) => {
		let stylez = "filters__item ";

		if (filter.toUpperCase() === activeFilter) {
			stylez += "filters__item_active";
		}

		return (
			<div 
				className={stylez}
				key={i}
				onClick={(e) => onClickFilter(e)}
			>
				{filter.toUpperCase()}
			</div>
		);
	});

	return (
		<>
			<div className="filters__list">

				{filtersOnPage}

			</div>
		</>
	);
}