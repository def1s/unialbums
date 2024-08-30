import { PersonalProfileDetails } from 'widgets/PersonalProfileDetails';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ProfilePage.module.scss';

interface ProfilePageProps {
    className?: string
}

const ProfilePage = ({ className }: ProfilePageProps) => {

	return (
		<div className={classNames(cls.ProfilePage, {}, [className])}>
			<PersonalProfileDetails/>
		</div>
	);
};

export default ProfilePage;
