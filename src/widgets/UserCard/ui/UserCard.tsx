import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import DefaultAvatar from 'shared/assets/icons/default-avatar.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import cls from './UserCard.module.scss';

interface UserCardProps {
    className?: string;
}

export const UserCard = (props: UserCardProps) => {
	const {
		className
	} = props;

	const userData = useSelector(getUserAuthData);

	const renderAvatar = () => {
		if (userData?.avatar) {
			return (
				<Avatar
					src={userData.avatar}
					className={cls.avatar}
				/>
			);
		} else {
			return <DefaultAvatar className={cls.defaultAvatar} />;
		}
	};
    
	return (
		<div className={classNames(cls.UserCard, {}, [className])}>
			{renderAvatar()}
			<div className={cls.username}>Привет, {userData?.username}!</div>
		</div>
	);
};
