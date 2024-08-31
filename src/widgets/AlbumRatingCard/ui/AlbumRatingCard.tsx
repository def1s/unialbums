import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AlbumRating, albumRatingReducer, getAlbumRatingRating } from 'entities/Albums/AlbumRating';
import { fetchAlbumRating } from 'entities/Albums/AlbumRating';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './AlbumRatingCard.module.scss';

interface AlbumRatingCardProps {
    className?: string;
}

const reducersList: ReducerList = {
	albumRating: albumRatingReducer
};

export const AlbumRatingCard = (props: AlbumRatingCardProps) => {
	const {
		className
	} = props;

	const { id } = useParams();
	const dispatch = useAppDispatch();

	const ratingData = useSelector(getAlbumRatingRating);

	useEffect(() => {
		if (id) {
			dispatch(fetchAlbumRating(id));
		}
	}, [dispatch, id]);
    
	return (
		<DynamicModuleLoader
			reducers={reducersList}
			removeAfterUnmount
		>
			<div className={classNames(cls.AlbumRatingCard, {}, [className])}>
				<AlbumRating
					data={ratingData}
				/>
			</div>
		</DynamicModuleLoader>
	);
};
