import { useState } from 'react';

import './filter.scss';

import arrow from '../../img/arrow.png';

export default function Filter({onSelectFilter, activeFilter}) {
	const filters = ['сброс', 'лучшее', 'худшее', 'по_исполнителю', 'по_алфавиту']; //какой-то баг с добавлением фильтра из нескольких слов
	const letterWidth = 18; //ширина одного символа в названии фильтра
	const widthOfWindow = 400; //ширина видимого окна фильтров
	const standartOffset = filters[0].length * letterWidth; //стандартный сдвиг

	let maxOffset = widthOfWindow; //максимальный сдвиг
	for (let filter of filters) {
		maxOffset -= filter.length * letterWidth; //
	}

	const [offset, setOffset] = useState(0);

	const onFiltersArrowClick = (i) => {
		if (offset + standartOffset < maxOffset) {
			setOffset(0);
		} else if (offset === 0 && i > 0) {
			return;
		} else {
			setOffset(offset => offset + standartOffset*i);
		}
	}

	const filtersOnPage = filters.map((filter, i) => {
		return(
			<div 
				onClick={(e) => onSelectFilter(e)}
				key={i}
				className={filter.toUpperCase() === activeFilter ? "filters__item filters__item_active" : 'filters__item'}>{filter.toUpperCase()}
			</div>
		);
	})

	return (
		<div className="filters">
			<img 
				src={arrow} 
				alt="Стрелка для переключения списка фильтров назад"
				className="filters__arrow" 
				onClick={() => onFiltersArrowClick(1)}
			/>

			<div className="filters__wrapper"> {/* переименовать класс в .filter__window */}
				<div className="filters__window" style={{'transform': `translateX(${offset}px)`}}> {/* переименовать класс в .filter__inner */}
					{ 
						filtersOnPage
					}
				</div>
			</div>

			<img 
				src={arrow} 
				alt="Стрелка для переключения списка фильтров вперед"
				className="filters__arrow" 
				onClick={() => onFiltersArrowClick(-1)}
			/>
		</div>
	);
}