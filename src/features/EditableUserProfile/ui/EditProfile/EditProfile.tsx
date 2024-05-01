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
import { Text, TextTheme } from 'shared/ui/Text/Text';
import {
	getProfileValidateErrors
} from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { ValidateProfileError } from '../../model/types/editableUserProfileSchema';

interface EditProfileProps {
    className?: string;
}

export const EditProfile = memo((props: EditProfileProps) => {
	const {
		className,
	} = props;

	const readonly = useSelector(getProfileReadonly);
	const validateErrors = useSelector(getProfileValidateErrors);
	const dispatch = useAppDispatch();

	const onEdit = useCallback(() => {
		dispatch(profileActions.setReadonly(false));
	}, [dispatch]);

	const onSave = useCallback(async () => {
		const result = await dispatch(updateProfileData());

		if (result.meta.requestStatus === 'fulfilled') {
			dispatch(profileActions.setReadonly(true));
			dispatch(userInitAuthData());
		}
	}, [dispatch]);

	const onReset = useCallback(() => {
		dispatch(profileActions.resetForm());
		dispatch(profileActions.setReadonly(true));
	}, [dispatch]);

	const validateErrorsTranslates = {
		[ValidateProfileError.SERVER_ERROR]: 'Серверная ошибка',
		[ValidateProfileError.NO_DATA]: 'Заполните все поля',
		[ValidateProfileError.INCORRECT_FIRSTNAME]: 'Некорректно заполнено имя',
		[ValidateProfileError.INCORRECT_LASTNAME]: 'Некорректно заполнена фамилия',
		[ValidateProfileError.INCORRECT_USERNAME]: 'Неверно заполнено имя пользователя'
	};

	return (
		<div className={classNames(cls.EditProfile, {}, [className])}>
			<EditControl
				readonly={readonly}
				onEdit={onEdit}
				onSave={onSave}
				onReset={onReset}
			/>

			{/* ошибки валидации */}
			{
				validateErrors?.map(error => (
					<Text
						key={error}
						text={validateErrorsTranslates[error]}
						theme={TextTheme.ERROR}
					/>
				))
			}
		</div>
	);
});
