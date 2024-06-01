import cls from './ProfileField.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Input, ThemeInput } from 'shared/ui/Input/Input';
import { memo, useCallback } from 'react';

interface ProfileFieldProps {
    className?: string;
	label: string;
	fieldValue?: string | number;
	readonly?: boolean;
	onChangeField?: (value: string) => void;
	error?: string | undefined
}

export const ProfileField = memo((props: ProfileFieldProps) => {
	const {
		className,
		label,
		fieldValue,
		readonly,
		error,
		onChangeField
	} = props;

	const onChange = useCallback((value: string) => {
		if (onChangeField) {
			onChangeField(value);
		}
	}, [onChangeField]);

	const mods: Record<string, boolean> = {
		[cls.error]: !!error
	};

	return (
		<div className={classNames(cls.ProfileField, mods, [className])}>
			<div className={cls.label}>{label}</div>

			{
				readonly ?
					<div className={cls.fieldValue}>{fieldValue}</div>
					:
					<Input
						value={fieldValue}
						className={cls.input}
						theme={ThemeInput.ONLY_BOTTOM_BORDER}
						onChange={onChange}
					/>
			}

			<div className={cls.errorMessage}>{error}</div>

		</div>
	);
});
