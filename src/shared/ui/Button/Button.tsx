import { ButtonHTMLAttributes, memo } from 'react';
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ThemeButton {
	LIGHT_BG = 'lightBg',
	RED = 'red'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string;
	theme?: ThemeButton;
}

export const Button = memo((props: ButtonProps) => {
	const {
		className,
		theme = ThemeButton.LIGHT_BG,
		children,
		...otherProps
	} = props;

	return (
		<button
			className={classNames(cls.Button, {}, [className, cls[theme]])}
			{...otherProps}
		>
			{children}
		</button>
	);
});
