import cls from './AlbumDetails.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useEffect } from 'react';
import {
	albumDescriptionReducer,
	fetchAlbumDescription,
	getAlbumDescriptionData,
	getAlbumDescriptionIsEditable,
	getAlbumDescriptionIsLoading,
} from 'entities/Albums/AlbumDescription';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AlbumDescription } from 'entities/Albums';
import { EditAlbumDescription } from 'features/EditAlbumDescription/ui/EditAlbumDescription/EditAlbumDescription';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
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
