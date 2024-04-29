import cls from './Loader.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';

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
