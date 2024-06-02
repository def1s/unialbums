import cls from './EditableUserProfile.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { ProfileCard } from 'entities/Profile';
import { useSelector } from 'react-redux';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { ChangeEvent, memo, useCallback, useEffect } from 'react';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { EditProfile } from 'features/EditableUserProfile/ui/EditProfile/EditProfile';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileFormServerMessage } from 'features/EditableUserProfile/model/selectors/getProfileFormServerMessage/getProfileFormServerMessage';
import { Notification, NotificationTheme } from 'shared/ui/Notification/Notification';
import {
	getProfileValidateErrors
} from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { validateProfileData } from 'features/EditableUserProfile/model/services/validateProfileData/validateProfileData';
import { useImage } from 'shared/lib/hooks/useImage/useImage';

interface EditableUserProfileProps {
    className?: string;
}

const reducers: ReducerList = {
	profile: profileReducer
};

export const EditableUserProfile = memo(({ className }: EditableUserProfileProps) => {
	const isLoading = useSelector(getProfileIsLoading);
	const error = useSelector(getProfileError);
	const serverMessage = useSelector(getProfileFormServerMessage);
	const readonly = useSelector(getProfileReadonly);
	const formData = useSelector(getProfileForm);
	const validateErrors = useSelector(getProfileValidateErrors);

	const dispatch = useAppDispatch();

	const {
		onCreateImage,
		onDeleteImage,
		localUrlImage
	} = useImage();

	useEffect(() => {
		dispatch(fetchProfileData());
		// eslint-disable-next-line
	}, []);

	const onChangeFirstName = useCallback((firstName: string) => {
		const errors = validateProfileData({ ...formData, firstName });
		dispatch(profileActions.setValidateErrors(errors));
		dispatch(profileActions.updateProfile({ firstName }));
	}, [dispatch, formData]);

	const onChangeLastName = useCallback((lastName: string) => {
		const errors = validateProfileData({ ...formData, lastName });
		dispatch(profileActions.setValidateErrors(errors));
		dispatch(profileActions.updateProfile({ lastName }));
	}, [dispatch, formData]);

	const onChangeUsername = useCallback((username: string) => {
		const errors = validateProfileData({ ...formData, username });
		dispatch(profileActions.setValidateErrors(errors));
		dispatch(profileActions.updateProfile({ username }));
	}, [dispatch, formData]);

	const onChangeAvatar = useCallback((avatar: string) => {
		dispatch(profileActions.updateProfile({ avatar }));
	}, [dispatch]);

	const onAddAvatar = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		onCreateImage(e);
		onChangeAvatar(localUrlImage.current);
	}, [localUrlImage, onChangeAvatar, onCreateImage]);

	const onDeleteAvatar = useCallback(() => {
		onDeleteImage();
		onChangeAvatar('');
	}, [onChangeAvatar, onDeleteImage]);

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
					readonly={readonly}
					data={formData}
					isLoading={isLoading}
					onChangeFirstName={onChangeFirstName}
					onChangeLastName={onChangeLastName}
					onChangeUsername={onChangeUsername}
					validateErrors={validateErrors}
					onAddAvatar={onAddAvatar}
					onDeleteAvatar={onDeleteAvatar}
				/>
				{
					!isLoading &&
					<EditProfile/>
				}
			</div>
		</DynamicModuleLoader>
	);
});
