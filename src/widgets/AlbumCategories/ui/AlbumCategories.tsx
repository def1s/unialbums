import React, { memo } from 'react';
import { CategoryCard } from 'entities/Category';
import cls from './AlbumCategories.module.scss';


export const AlbumCategories = memo(() => {
	const categories = [
		{
			image: 'https://sun9-40.userapi.com/impg/vClw64DcVV3apJglD6FqtqaUyG510d109E7hqg/Vpz2iSVZcGo.jpg?size=1200x1200&quality=95&sign=4c465f3d32d596d3dfe3113dba327ea9&type=album',
			url: 'hiphop',
			title: 'Хип-хоп',
		},
		{
			image: 'https://sun9-44.userapi.com/impg/gQZVlgAkhOT-hGDEaeUGzbL1MPwsVk0BHgbKhw/PSVrsc-JLGQ.jpg?size=800x800&quality=95&sign=2f905d578935c0df1ebec7c8f6b7e0f9&type=album',
			url: 'jazz',
			title: 'Джаз',
		},
		{
			image: 'https://sun9-19.userapi.com/s/v1/ig2/i7FqtqCyFdp2x5Je34gug5A6JwjepE5Q95h0iUYJzNaSQ9m6KjU_WOYDNTutZD_sDxEOrvH-Xszt9txVykyHzf_T.jpg?quality=95&as=32x33,48x49,72x73,108x110,160x163,240x245,360x367,480x489,540x551,640x653,720x734,1080x1101,1280x1305,1440x1468,1471x1500&from=bu&u=gn_zZM_XEgzeawFtOqpRy55SVCmqKltmPk-e4qHQSHI&cs=1471x1500',
			url: 'rnb',
			title: 'RnB',
		},
		{
			image: 'https://sun9-12.userapi.com/impg/CDYK1WcrqJF0f70wbU2Mw95g7p5eysD9vyfj3Q/TVIEXHAX-7E.jpg?size=500x500&quality=95&sign=532b36071fc031dbc2b2e137f841ef5e&type=album',
			url: 'rock',
			title: 'Рок',
		},
		{
			image: 'https://sun9-37.userapi.com/impg/LYOxdOokRpYMcCFmdGd5N-ftAZtq8L5kwSyqZA/qsbg9-7k9rI.jpg?size=1000x1000&quality=95&sign=a2ce6edb0f6276453180e3967ac79a0e&type=album',
			url: 'techno',
			title: 'Техно',
		},
	];

	return (
		<div className={cls.wrapper}>

			{categories.map((category, it) => (
				<CategoryCard
					image={category.image}
					url={category.url}
					title={category.title}
					key={it}
				/>
			))}

		</div>
	);
});
