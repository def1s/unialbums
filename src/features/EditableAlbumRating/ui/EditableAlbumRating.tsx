import cls from './EditableAlbumRating.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { getAlbumRatingData } from '../model/selectors/getAlbumRatingData/getAlbumRatingData';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchAlbumRating } from '../model/services/fetchAlbumRating/fetchAlbumRating';
import { useParams } from 'react-router-dom';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { albumRatingReducer } from '../model/slice/albumRatingSlice';

interface EditableAlbumRatingProps {
	className?: string;
}

const initialReducers: ReducerList = {
	albumRating: albumRatingReducer
};

export const EditableAlbumRating = (props: EditableAlbumRatingProps) => {
	const {
		className
	} = props;

	const dispatch = useAppDispatch();

	const { id } = useParams();

	useEffect(() => {
		dispatch(fetchAlbumRating({ id }));
	}, [dispatch, id]);

	const data = useSelector(getAlbumRatingData);

	return (
		<DynamicModuleLoader
			reducers={initialReducers}
			removeAfterUnmount
		>
			<div className={classNames(cls.EditableAlbumRating, {}, [className])}>
				<div className={cls.totalRating}>{data?.totalRating}</div>
			</div>
		</DynamicModuleLoader>
	);
};
