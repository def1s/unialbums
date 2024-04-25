import cls from './Input.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { ChangeEvent, InputHTMLAttributes, memo } from 'react';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

export enum ThemeInput {
	LIGHT_BG = 'lightBg',
	ONLY_BORDER = 'onlyBorder'
}

interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string | number;
	onChange?: (value: string, field?: string) => void;
	theme?: ThemeInput;
	name?: string;
	readonly?: boolean;
}


export const Input = memo((props: InputProps) => {
	const {
		className,
		value,
		onChange,
		theme = ThemeInput.LIGHT_BG,
		name,
		readonly,
		...otherProps
	} = props;

	const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value, name);
	};

	const additional = [
		className,
		cls[theme]
	];

	const mods: Record<string, boolean | undefined> = {
		[cls.readonly]: readonly
	};

	return (
		<input
			className={classNames(cls.Input, mods, additional)}
			value={value}
			onChange={(e) => onHandleChange(e)}
			readOnly={readonly}
			{...otherProps}
		>
		</input>
	);
});
