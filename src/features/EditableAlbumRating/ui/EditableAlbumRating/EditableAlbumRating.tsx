import cls from './EditableAlbumRating.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchAlbumRating } from '../../model/services/fetchAlbumRating/fetchAlbumRating';
import { useParams } from 'react-router-dom';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { albumRatingActions, albumRatingReducer } from '../../model/slice/albumRatingSlice';
import {
	getAlbumRatingSliders
} from '../../model/selectors/getAlbumRatingSliders/getAlbumRatingSliders';
import { EditRating } from '../EditRating/EditRating';
import {
	getAlbumRatingIsEditable
} from '../../model/selectors/getAlbumRatingIsEditable/getAlbumRatingIsEditable';
import { AlbumRating } from 'entities/Albums';
import {
	getAlbumRatingReadonly
} from '../../model/selectors/getAlbumRatingReadonly/getAlbumRatingReadonly';
import {
	getAlbumRatingIsLoading
} from '../../model/selectors/getAlbumRatingIsLoading/getAlbumRatingIsLoading';
import {
	getAlbumRatingError
} from '../../model/selectors/getAlbumRatingError/getAlbumRatingError';

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

	const data = useSelector(getAlbumRatingSliders);
	const isEditable = useSelector(getAlbumRatingIsEditable);
	const readonly = useSelector(getAlbumRatingReadonly);
	const isLoading = useSelector(getAlbumRatingIsLoading);
	// TODO сделать обработку ошибок
	// const error = useSelector(getAlbumRatingError);

	const onChangeBitsRating = useCallback((value: number | string) => {
		dispatch(albumRatingActions.updateRatingSliders({
			bitsRating: +value
		}));
	}, [dispatch]);

	const onChangeAtmosphereRating = useCallback((value: number | string) => {
		dispatch(albumRatingActions.updateRatingSliders({
			atmosphereRating: +value
		}));
	}, [dispatch]);

	const onChangeTextRating = useCallback((value: number | string) => {
		dispatch(albumRatingActions.updateRatingSliders({
			textRating: +value
		}));
	}, [dispatch]);

	const onChangeTracksRating = useCallback((value: number | string) => {
		dispatch(albumRatingActions.updateRatingSliders({
			tracksRating: +value
		}));
	}, [dispatch]);

	return (
		<DynamicModuleLoader
			reducers={initialReducers}
			removeAfterUnmount
		>
			<div className={classNames(cls.EditableAlbumRating, {}, [className])}>
				<AlbumRating
					data={data}
					readonly={readonly}
					onChangeBitsRating={onChangeBitsRating}
					onChangeAtmosphereRating={onChangeAtmosphereRating}
					onChangeTextRating={onChangeTextRating}
					onChangeTracksRating={onChangeTracksRating}
					EditFeature={isEditable ? <EditRating/> : null}
					isLoading={isLoading}
				/>
			</div>
		</DynamicModuleLoader>
	);
};
