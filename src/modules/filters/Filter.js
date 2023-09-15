import './filter.scss';

export default function Filter({onSelectFilter}) {
	return (
		<div class="filters">
			<div onClick={(e) => onSelectFilter(e)} class="filters__item">ДЕФОЛТНО</div>
			<div onClick={(e) => onSelectFilter(e)} class="filters__item">ЛУЧШЕЕ</div>
			<div onClick={(e) => onSelectFilter(e)} class="filters__item">ХУДШЕЕ</div>
		</div>
	);
}