import cls from './EditableUserProfile.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { EditableProfileCard } from 'entities/Profile';
import { useSelector } from 'react-redux';
import { getProfileFields } from '../model/selectors/getProfileFields/getProfileFields';
import { getProfileData } from '../model/selectors/getProfileData/getProfileData';
import {
	getProfileIsLoading
} from '../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from '../model/selectors/getProfileError/getProfileError';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getProfileReadonly } from '../model/selectors/getProfileReadonly/getProfileReadonly';
import { useEffect } from 'react';
import { fetchProfileData } from '../model/services/fetchProfileData/fetchProfileData';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { profileReducer } from '../model/slice/profileSlice';

interface EditableUserProfileProps {
    className?: string;
}

const reducers: ReducerList = {
	profile: profileReducer
};

export const EditableUserProfile = ({ className }: EditableUserProfileProps) => {
	const profileFields = useSelector(getProfileFields);
	const data = useSelector(getProfileData);
	const isLoading = useSelector(getProfileIsLoading);
	const error = useSelector(getProfileError);
	const readonly = useSelector(getProfileReadonly);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchProfileData());
		// eslint-disable-next-line
	}, []);

	return (
		<DynamicModuleLoader
			reducers={reducers}
		>
			<div className={classNames(cls.EditableUserProfile, {}, [className])}>
				<EditableProfileCard
					fields={profileFields}
					readonly={readonly}
					data={data}
					isLoading={isLoading}
					error={error}
				/>
			</div>
		</DynamicModuleLoader>
	);
};
