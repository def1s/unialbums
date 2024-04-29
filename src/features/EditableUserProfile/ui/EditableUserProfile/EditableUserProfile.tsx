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
import { EditProfile } from 'features/EditableUserProfile/ui/EditProfile/EditProfile';
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
	const serverMessage = useSelector(getProfileFormMessage);
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

	// уведомления
	const notifications = (
		<>
			{
				!isLoading && !error && serverMessage &&
                <Notification message={serverMessage} theme={NotificationTheme.SUCCESSFUL}/>
			}

			{
				!isLoading && error &&
                <Notification message={error} theme={NotificationTheme.ERROR}/>
			}
		</>
	);

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<div className={classNames(cls.EditableUserProfile, {}, [className])}>
				{/* уведомления */}
				{notifications}

				<ProfileCard
					fields={profileFields}
					readonly={readonly}
					data={formData}
					isLoading={isLoading}
					onChangeField={onChangeField}
				/>
				{
					!isLoading &&
					<EditProfile/>
				}
			</div>
		</DynamicModuleLoader>
	);
});
