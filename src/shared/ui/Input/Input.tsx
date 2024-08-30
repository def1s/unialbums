import { ChangeEvent, InputHTMLAttributes, memo } from 'react';
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string | number;
	onChange?: (value: string) => void;
	readonly?: boolean;
	error?: string;
	label?: string;
}

export const Input = memo((props: InputProps) => {
	const {
		className,
		value,
		onChange,
		readonly,
		error,
		label,
		...otherProps
	} = props;

	const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
	};

	const mods: Record<string, boolean | undefined> = {
		[cls.readonly]: readonly,
		[cls.error]: !!error?.length
	};

	return (
		<div className={classNames(cls.inputWrapper, {}, [className])}>
			<input
				className={classNames(cls.Input, mods, [className])}
				value={value}
				onChange={(e) => onHandleChange(e)}
				readOnly={readonly}
				placeholder=" "
				{...otherProps}
			/>
			<label className={cls.floatingLabel}>{label}</label>
			{/*{error && <div className={cls.errorMessage}>{error}</div>}*/}
		</div>
	);
});
