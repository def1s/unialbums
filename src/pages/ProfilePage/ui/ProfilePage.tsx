import cls from './ProfilePage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { EditableUserProfile } from 'features/EditableUserProfile/ui/EditableUserProfile';

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
