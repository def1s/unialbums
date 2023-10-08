import './header.scss';

import { NavLink } from 'react-router-dom';

export default function Header({onChangeInputSearch, searchStr}) {
	return (
		<header className="header">
			<div className="container">
				<div className="header__wrapper">

				<nav>
					<ul>
						<li><NavLink 
							end 
							style={({isActive}) => isActive ? {'color': 'rgb(200, 26, 22)'} : null}
							to={'/'}>BACK TO MAIN PAGE</NavLink></li>
						{/* /
						<li><NavLink  //придумать вывод истории на основании посещенных страниц
							end 
							style={({isActive}) => isActive ? {'color': '#9F0013'} : null}
							to={'/albums'}>Albums</NavLink></li> */}
					</ul>
           		</nav> 

					{onChangeInputSearch ? ( //если в компонент передается функция для поиска строки, то мы добавляем функционал, если нет, то не добавляем. изменить на props.children!!
						<input 
						type="text" 
						placeholder='Поиск альбома' 
						className='search'
						onChange={(e) => onChangeInputSearch(e)}
						value={searchStr}
					/>
					) : null}
				</div>

			</div>
		</header>
	);
}