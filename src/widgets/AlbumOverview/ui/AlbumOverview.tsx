import cls from './AlbumOverview.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo } from 'react';
import { AlbumDescription } from 'entities/AlbumDescription';

interface AlbumOverviewProps {
    className?: string
}

export const AlbumOverview = memo(({ className }: AlbumOverviewProps) => {

	return (
		<div
			className={classNames(cls.AlbumOverview, {}, [className])}
		>
			<div className={cls.backgroundImage}>
				<img src="https://upload.wikimedia.org/wikipedia/en/1/1b/Joji_-_Nectar.png" alt=""/>
			</div>

			<AlbumDescription
				cover={'https://upload.wikimedia.org/wikipedia/en/1/1b/Joji_-_Nectar.png'}
				title={'Nectar'}
				artist={'Joji'}
				year={2020}
				rating={98}
			/>

		</div>
	);
});
