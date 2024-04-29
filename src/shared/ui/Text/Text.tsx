import cls from './Text.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';

export enum TextTheme {
	PRIMARY = 'primary',
	ERROR = 'error',
	SUCCESSFUL = 'successful'
}

export enum TextAlign {
	LEFT = 'left',
	RIGHT = 'right',
	CENTER = 'center'
}

interface TextProps {
	title?: string;
	text?: string;
    className?: string;
	theme?: TextTheme;
	align?: TextAlign;
}

export const Text = memo((props: TextProps) => {
	const {
		title,
		text,
		className,
		theme = TextTheme.PRIMARY,
		align = TextAlign.LEFT
	} = props;

	return (
		<div className={classNames(cls.Text, {}, [className, cls[theme], cls[align]])}>
			{title && <p className={cls.title}>{title}</p>}
			{text && <p className={cls.text}>{text}</p>}
		</div>
	);
});
