import cls from './Blur.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

interface BlurProps {
    className?: string
}

export const Blur = ({ className }: BlurProps) => {

	return (
		<div className={classNames(cls.Blur, {}, [className])}></div>
	);
};
