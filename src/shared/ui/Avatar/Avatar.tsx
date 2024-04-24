import cls from './Avatar.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

export enum AvatarSize {
	SMALL = 'small',
	MEDIUM = 'medium',
	LARGE = 'large',
}

interface AvatarProps {
    className?: string;
	src?: string;
	size?: AvatarSize;
}

export const Avatar = (props: AvatarProps) => {
	const {
		className,
		size = AvatarSize.MEDIUM,
		src
	} = props;

	const additional = [
		className,
		cls[size]
	];

	return (
		<img
			className={classNames(cls.Avatar, {}, additional)}
			src={src}
			alt={'Аватар пользователя'}
		/>
	);
};
