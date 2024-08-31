import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DeleteAlbum } from 'features/DeleteAlbum';
import { EditAlbumDescription } from 'features/EditAlbumDescription';
import {
	AlbumDescription,
	albumDescriptionReducer,
	fetchAlbumDescription,
	getAlbumDescriptionData, getAlbumDescriptionError,
	getAlbumDescriptionIsEditable,
	getAlbumDescriptionIsLoading,
} from 'entities/Albums/AlbumDescription';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './AlbumDescriptionCard.module.scss';

interface AlbumDescriptionCardProps {
    className?: string;
}

const initialReducers: ReducerList = {
	albumDescription: albumDescriptionReducer
};

export const AlbumDescriptionCard = (props: AlbumDescriptionCardProps) => {
	const {
		className
	} = props;

	const { id } = useParams();
	const dispatch = useAppDispatch();

	const data = useSelector(getAlbumDescriptionData);
	const isLoading = useSelector(getAlbumDescriptionIsLoading);
	const isEditable = useSelector(getAlbumDescriptionIsEditable);
	const error = useSelector(getAlbumDescriptionError);

	useEffect(() => {
		if (id) {
			dispatch(fetchAlbumDescription(id));
		}
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
					error={error}
					EditFeature={isEditable ? <EditAlbumDescription/> : null}
					DeleteFeature={isEditable ? <DeleteAlbum albumId={id || '-1'}/> : null}
				/>
			</div>
		</DynamicModuleLoader>
	);
};
