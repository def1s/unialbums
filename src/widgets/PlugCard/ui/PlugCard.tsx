import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import cls from './PlugCard.module.scss';

interface PlugCardProps {
    className?: string;
	title?: string;
	text?: string;
}

export const PlugCard = memo((props: PlugCardProps) => {
	const {
		className,
		title,
		text
	} = props;

	return (
		<div className={classNames(cls.PlugCard, {}, [className])}>
			<Text
				title={title}
				text={text}
				align={TextAlign.LEFT}
			/>
		</div>
	);
});
