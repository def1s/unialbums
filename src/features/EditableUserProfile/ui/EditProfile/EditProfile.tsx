import { profileActions } from '../../model/slice/profileSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { memo, useCallback } from 'react';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { userInitAuthData } from 'entities/User';
import { EditControl } from 'entities/EditControl';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './EditProfile.module.scss';
import { useSelector } from 'react-redux';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { validateProfileData } from '../../model/services/validateProfileData/validateProfileData';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';

interface EditProfileProps {
    className?: string;
}

export const EditProfile = memo((props: EditProfileProps) => {
	const {
		className,
	} = props;

	const readonly = useSelector(getProfileReadonly);
	const dispatch = useAppDispatch();
	const formData = useSelector(getProfileForm);

	const onEdit = useCallback(() => {
		dispatch(profileActions.setReadonly(false));
	}, [dispatch]);

	const onSave = useCallback(async () => {
		const errors = validateProfileData(formData);

		/*
		* Проверяю на наличие ошибок валидации. Ошибки выставляю даже если они уже проверялись на этапе ввода
		* пользователем, чтобы наверняка. Если ошибки есть, то данные не отправляю.
		* */
		if (Object.keys(errors).length) {
			dispatch(profileActions.setValidateErrors(errors));
		} else {
			const result = await dispatch(updateProfileData());

			if (result.meta.requestStatus === 'fulfilled') {
				dispatch(profileActions.setReadonly(true));
				dispatch(userInitAuthData());
			}
		}
	}, [dispatch, formData]);

	const onReset = useCallback(() => {
		dispatch(profileActions.resetForm());
		dispatch(profileActions.setReadonly(true));
	}, [dispatch]);

	return (
		<div className={classNames(cls.EditProfile, {}, [className])}>
			<EditControl
				readonly={readonly}
				onEdit={onEdit}
				onSave={onSave}
				onReset={onReset}
				className={cls.editButtons}
			/>
		</div>
	);
});
