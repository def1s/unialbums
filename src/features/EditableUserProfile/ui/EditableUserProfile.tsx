import cls from './EditableUserProfile.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { EditableProfileCard } from 'entities/Profile';
import { useSelector } from 'react-redux';
import { getProfileFields } from '../model/selectors/getProfileFields/getProfileFields';

interface EditableUserProfileProps {
    className?: string
}

export const EditableUserProfile = ({ className }: EditableUserProfileProps) => {
	const profileFields = useSelector(getProfileFields);

	return (
		<div className={classNames(cls.EditableUserProfile, {}, [className])}>
			<EditableProfileCard
				fields={profileFields}
				readonly={true}
			/>
		</div>
	);
};
