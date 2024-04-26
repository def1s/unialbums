import cls from './EditableUserProfileFooter.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { profileActions } from '../../model/slice/profileSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { memo, useCallback } from 'react';
import { updateProfileData } from 'features/EditableUserProfile/model/services/updateProfileData/updateProfileData';

interface EditableUserProfileFooterProps {
    className?: string;
	readonly?: boolean;
}

export const EditableUserProfileFooter = memo((props: EditableUserProfileFooterProps) => {
	const {
		className,
		readonly
	} = props;

	const dispatch = useAppDispatch();

	const onEdit = useCallback(() => {
		dispatch(profileActions.setReadonly(false));
	}, [dispatch]);

	const onSave = useCallback(async () => {
		const result = await dispatch(updateProfileData());

		if (result.meta.requestStatus === 'fulfilled') {
			dispatch(profileActions.setReadonly(true));
		}
	}, [dispatch]);

	return (
		<div className={classNames(cls.EditableUserProfileFooter, {}, [className])}>
			<div className={cls.buttonsWrapper}>
				{
					!readonly &&
					<Button
						className={cls.button}
						onClick={onSave}
					>
						Сохранить
					</Button>
				}

				<Button
					className={cls.button}
					onClick={onEdit}
				>
					Редактировать
				</Button>
			</div>
		</div>
	);
});
