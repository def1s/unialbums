import cls from './Text.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';

export enum ThemeText {
	PRIMARY = 'primary',
	ERROR = 'error',
	SUCCESSFUL = 'successful'
}

interface TextProps {
	title?: string;
	text?: string;
    className?: string;
	theme?: ThemeText;
}

export const Text = memo((props: TextProps) => {
	const {
		title,
		text,
		className,
		theme = ThemeText.PRIMARY
	} = props;

	return (
		<div className={classNames(cls.Text, {}, [className, cls[theme]])}>
			{title && <p className={cls.title}>{title}</p>}
			{text && <p className={cls.text}>{text}</p>}
		</div>
	);
});
