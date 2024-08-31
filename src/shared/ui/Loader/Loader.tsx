import { memo } from 'react';
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Loader.module.scss';

export enum LoaderPosition {
	CENTER = 'center',
	// TOP_RIGHT = 'topRight'
}

interface LoaderProps {
    className?: string;
	position?: LoaderPosition
}

export const Loader = memo((props: LoaderProps) => {
	const {
		className,
		position = LoaderPosition.CENTER
	} = props;

	return (
		<span className={classNames(cls.loader, {}, [className, cls[position]])}></span>
	);
});
