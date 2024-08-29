import { EditableUserProfile } from 'features/EditableUserProfile';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ProfilePage.module.scss';

interface ProfilePageProps {
    className?: string
}

const ProfilePage = ({ className }: ProfilePageProps) => {

	return (
		<div className={classNames(cls.ProfilePage, {}, [className])}>
			<EditableUserProfile/>
		</div>
	);
};

export default ProfilePage;
