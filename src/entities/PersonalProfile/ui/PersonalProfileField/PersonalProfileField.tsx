import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './PersonalProfileField.module.scss';

interface PersonalProfileFieldProps {
    className?: string;
	label: string;
	fieldValue?: string | number;
}

export const PersonalProfileField = memo((props: PersonalProfileFieldProps) => {
	const {
		className,
		label,
		fieldValue
	} = props;

	return (
		<div className={classNames(cls.PersonalProfileField, {}, [className])}>
			<div className={cls.label}>{label}</div>
			
			<div className={cls.fieldValue}>{fieldValue}</div>
		</div>
	);
});
