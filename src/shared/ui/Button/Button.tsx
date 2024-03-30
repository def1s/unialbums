import cls from './Button.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { ButtonHTMLAttributes } from 'react';

export enum ThemeButton {
	LIGHT_BG = 'lightBg'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string;
	theme?: ThemeButton;
}

export const Button = (props: ButtonProps) => {
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
};
