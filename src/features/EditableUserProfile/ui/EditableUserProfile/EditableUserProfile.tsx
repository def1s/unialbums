import cls from './EditableUserProfile.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { ProfileCard, ProfileKey } from 'entities/Profile';
import { useSelector } from 'react-redux';
import { getProfileFields } from '../../model/selectors/getProfileFields/getProfileFields';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { memo, useCallback, useEffect } from 'react';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { EditableUserProfileFooter } from '../EditableUserProfileFooter/EditableUserProfileFooter';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileFormMessage } from '../../model/selectors/getProfileFormMessage/getProfileFormMessage';
import { Notification, NotificationTheme } from 'shared/ui/Notification/Notification';

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
	const message = useSelector(getProfileFormMessage);
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
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<div className={classNames(cls.EditableUserProfile, {}, [className])}>
				<ProfileCard
					fields={profileFields}
					readonly={readonly}
					data={formData}
					isLoading={isLoading}
					error={error}
					onChangeField={onChangeField}
				/>
				{
					!isLoading &&
					<EditableUserProfileFooter
						readonly={readonly}
					/>
				}
				{message && <Notification message={message} theme={NotificationTheme.SUCCESSFUL}/>}
				{error && <Notification message={error} theme={NotificationTheme.ERROR}/>}
			</div>
		</DynamicModuleLoader>
	);
});
