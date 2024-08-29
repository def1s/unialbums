import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { EditAlbumDescription } from 'features/EditAlbumDescription';
import {
	AlbumDescription,
	albumDescriptionReducer,
	fetchAlbumDescription,
	getAlbumDescriptionData,
	getAlbumDescriptionIsEditable,
	getAlbumDescriptionIsLoading,
} from 'entities/Albums/AlbumDescription';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './AlbumDetails.module.scss';

interface AlbumDetailsProps {
    className?: string;
}

const initialReducers: ReducerList = {
	albumDescription: albumDescriptionReducer
};

export const AlbumDetails = (props: AlbumDetailsProps) => {
	const {
		className
	} = props;

	const { id } = useParams();
	const dispatch = useAppDispatch();

	const data = useSelector(getAlbumDescriptionData);
	const isLoading = useSelector(getAlbumDescriptionIsLoading);
	const isEditable = useSelector(getAlbumDescriptionIsEditable);

	useEffect(() => {
		dispatch(fetchAlbumDescription({ id }));
	}, [dispatch, id]);

	return (
		<DynamicModuleLoader
			reducers={initialReducers}
			removeAfterUnmount
		>
			<div className={classNames(cls.AlbumDetails, {}, [className])}>
				<AlbumDescription
					data={data}
					isLoading={isLoading}
					EditFeature={isEditable ? <EditAlbumDescription/> : null}
				/>
			</div>
		</DynamicModuleLoader>
	);
};
