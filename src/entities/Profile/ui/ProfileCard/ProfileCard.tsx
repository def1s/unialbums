import cls from './ProfileCard.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';

interface ProfileCardProps {
    className?: string
}

export const ProfileCard = ({ className }: ProfileCardProps) => {
	const isLoading = useSelector(getProfileIsLoading);
	const error = useSelector(getProfileError);
	const profileData = useSelector(getProfileData);

	return (
		<div className={classNames(cls.ProfileCard, {}, [className])}>

		</div>
	);
};
