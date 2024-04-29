import cls from './EditableAlbumDescription.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { AlbumDescription } from 'entities/Albums';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
	fetchAlbumDescription
} from '../../model/services/fetchAlbumDescription/fetchAlbumDescription';
import { useSelector } from 'react-redux';
import {
	getAlbumDescriptionData
} from '../../model/selectors/getAlbumDescriptionData/getAlbumDescriptionData';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { albumDescriptionReducer } from '../../model/slice/albumDescriptionSlice';
import {
	getAlbumDescriptionIsLoading
} from '../../model/selectors/getAlbumDescriptionIsLoading/getAlbumDescriptionIsLoading';

interface EditableAlbumDescriptionProps {
    className?: string
}

const initialReducers: ReducerList = {
	albumDescription: albumDescriptionReducer
};

export const EditableAlbumDescription = ({ className }: EditableAlbumDescriptionProps) => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const data = useSelector(getAlbumDescriptionData);
	const isLoading = useSelector(getAlbumDescriptionIsLoading);

	useEffect(() => {
		dispatch(fetchAlbumDescription({ id }));
	}, [dispatch, id]);

	return (
		<DynamicModuleLoader
			reducers={initialReducers}
			removeAfterUnmount
		>
			<div className={classNames(cls.EditableAlbumDescription, {}, [className])}>
				<AlbumDescription
					data={data}
					isLoading={isLoading}
				/>
			</div>
		</DynamicModuleLoader>
	);
};
