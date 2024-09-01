import { memo, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { PersonalProfileModal } from '../PersonalProfileModal/PersonalProfileModal';
import cls from './EditPersonalProfile.module.scss';

interface EditPersonalProfileProps {
	className?: string;
}

export const EditPersonalProfile = memo((props: EditPersonalProfileProps) => {
	const {
		className,
	} = props;

	const [isEditPersonalProfileModal, setIsEditPersonalProfileModal] = useState(false);

	const onOpenEditModal = useCallback(() => {
		setIsEditPersonalProfileModal(true);
	}, []);

	const onCloseEditModal = useCallback(() => {
		setIsEditPersonalProfileModal(false);
	}, []);

	return (
		<div className={classNames(cls.EditPersonalProfile, {}, [className])}>
			<div className={cls.buttonsWrapper}>
				<Button
					className={cls.button}
					onClick={onOpenEditModal}
				>
						Редактировать
				</Button>

				{
					isEditPersonalProfileModal &&
						<PersonalProfileModal
							isOpen={isEditPersonalProfileModal}
							onClose={onCloseEditModal}
						/>
				}
			</div>
		</div>
	);
});
