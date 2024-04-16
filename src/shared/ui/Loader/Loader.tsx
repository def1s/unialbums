import cls from './Loader.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';

export enum ThemeLoader {
	CENTER = 'center',
	// CENTER_BLEARY_BG = 'blearyBg'
}

interface LoaderProps {
    className?: string;
	theme?: ThemeLoader
}

export const Loader = memo((props: LoaderProps) => {
	const {
		className,
		theme = ThemeLoader.CENTER
	} = props;

	return (
		<span className={classNames(cls.loader, {}, [className, cls[theme]])}></span>
	);
});
