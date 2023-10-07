import './interaction.scss';

import Filter from '../filters/Filter';

const Interaction = ({onOpenModal, onSelectFilter, activeFilter}) => {
	return (
		<div className="interaction">

			<button className='add-album-button' onClick={onOpenModal}>ДОБАВИТЬ АЛЬБОМ</button>

			<Filter
				onSelectFilter={onSelectFilter}
				activeFilter={activeFilter}
			/>

		</div>
	);
}

export default Interaction;