import cls from './ProfileField.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Input, ThemeInput } from 'shared/ui/Input/Input';

interface ProfileFieldProps {
    className?: string;
	label: string;
	fieldValue: string | number;
	readonly?: boolean;
}

export const ProfileField = (props: ProfileFieldProps) => {
	const {
		className,
		label,
		fieldValue,
		readonly
	} = props;

	return (
		<div className={classNames(cls.ProfileField, {}, [className])}>
			<div className={cls.label}>{label}</div>

			{
				readonly ?
					<div className={cls.fieldValue}>{fieldValue}</div>
					:
					<Input
						value={fieldValue}
						className={cls.input}
						theme={ThemeInput.ONLY_BORDER}
					/>
			}

		</div>
	);
};
