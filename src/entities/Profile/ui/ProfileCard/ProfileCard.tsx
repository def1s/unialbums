import cls from './ProfileCard.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Profile } from '../../model/types/profile';
import { Input } from 'shared/ui/Input/Input';

interface ProfileCardProps {
    className?: string;
	data?: Profile;
	isLoading?: boolean;
	error?: string;
}

export const ProfileCard = (props: ProfileCardProps) => {
	const {
		className,
		data,
		isLoading,
		error
	} = props;

	return (
		<div className={classNames(cls.ProfileCard, {}, [className])}>
			<img src={data?.avatar} alt="Аватар пользователя"/>
			<Input placeholder={'Имя'}/>
			<Input placeholder={'Фамилия'}/>
			<Input placeholder={''}/>
			<Input/>
		</div>
	);
};
