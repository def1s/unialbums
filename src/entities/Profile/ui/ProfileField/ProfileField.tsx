import cls from './ProfileField.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

interface ProfileFieldProps {
    className?: string;
	label: string;
	fieldValue: string | number;
}

export const ProfileField = ({ className, label, fieldValue }: ProfileFieldProps) => {

	return (
		<div className={classNames(cls.ProfileField, {}, [className])}>
			<div className={cls.label}>{label}</div>
			<div className={cls.fieldValue}>{fieldValue}</div>
		</div>
	);
};
