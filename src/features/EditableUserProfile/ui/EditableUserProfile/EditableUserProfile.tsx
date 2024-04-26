import cls from './EditableUserProfile.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { EditableProfileCard } from 'entities/Profile';
import { useSelector } from 'react-redux';
import { getProfileFields } from '../../model/selectors/getProfileFields/getProfileFields';
import {
	getProfileIsLoading
} from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { memo, useCallback, useEffect } from 'react';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import {
	EditableUserProfileFooter
} from '../EditableUserProfileFooter/EditableUserProfileFooter';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { ProfileKey } from 'entities/Profile';

interface EditableUserProfileProps {
    className?: string;
}

const reducers: ReducerList = {
	profile: profileReducer
};

export const EditableUserProfile = memo(({ className }: EditableUserProfileProps) => {
	const profileFields = useSelector(getProfileFields);
	const isLoading = useSelector(getProfileIsLoading);
	const error = useSelector(getProfileError);
	const readonly = useSelector(getProfileReadonly);
	const formData = useSelector(getProfileForm);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchProfileData());
		// eslint-disable-next-line
	}, []);

	const onChangeField = useCallback((field: ProfileKey, value: string | number) => {
		dispatch(profileActions.updateProfile({ [field]: value }));
	}, [dispatch]);

	return (
		<DynamicModuleLoader reducers={reducers}>
			<div className={classNames(cls.EditableUserProfile, {}, [className])}>
				<EditableProfileCard
					fields={profileFields}
					readonly={readonly}
					data={formData}
					isLoading={isLoading}
					error={error}
					onChangeField={onChangeField}
				/>
				<EditableUserProfileFooter
					readonly={readonly}
				/>
			</div>
		</DynamicModuleLoader>
	);
});
