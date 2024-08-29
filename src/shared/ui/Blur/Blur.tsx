import { memo } from 'react';
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Blur.module.scss';

interface BlurProps {
    className?: string
}

export const Blur = memo(({ className }: BlurProps) => {

	return (
		<div className={classNames(cls.Blur, {}, [className])}></div>
	);
});
