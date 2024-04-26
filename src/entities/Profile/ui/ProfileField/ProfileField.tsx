import cls from './ProfileField.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Input, ThemeInput } from 'shared/ui/Input/Input';
import { ProfileKey } from 'entities/Profile';
import { memo, useCallback } from 'react';

interface ProfileFieldProps {
    className?: string;
	label: string;
	fieldValue: string | number;
	readonly?: boolean;
	fieldName: ProfileKey;
	onChangeField: (field: ProfileKey, value: string | number) => void;
}

export const ProfileField = memo((props: ProfileFieldProps) => {
	const {
		className,
		label,
		fieldValue,
		readonly,
		fieldName,
		onChangeField
	} = props;

	const onChange = useCallback((value: string) => {
		onChangeField(fieldName, value);
	}, [fieldName, onChangeField]);

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
						onChange={onChange}
					/>
			}

		</div>
	);
});
