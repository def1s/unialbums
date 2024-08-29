import { ImgHTMLAttributes, memo } from 'react';
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';

export enum AvatarSize {
	SMALL = 'small',
	MEDIUM = 'medium',
	LARGE = 'large',
}

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
	size?: AvatarSize;
}

export const Avatar = memo((props: AvatarProps) => {
	const {
		className,
		size = AvatarSize.MEDIUM,
		src,
		...otherProps
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
			{...otherProps}
		/>
	);
});
