import cls from './Blur.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';

interface BlurProps {
    className?: string
}

export const Blur = memo(({ className }: BlurProps) => {

	return (
		<div className={classNames(cls.Blur, {}, [className])}></div>
	);
});
