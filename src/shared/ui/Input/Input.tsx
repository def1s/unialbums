import cls from './Input.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { ChangeEvent, InputHTMLAttributes, memo } from 'react';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

export enum ThemeInput {
	LIGHT_BG = 'lightBg'
}

interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string;
	onChange?: (value: string, field?: string) => void;
	theme?: ThemeInput;
	name?: string;
}


export const Input = memo((props: InputProps) => {
	const {
		className,
		value,
		onChange,
		theme = ThemeInput.LIGHT_BG,
		name,
		...otherProps
	} = props;

	const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value, name);
	};

	return (
		<input
			className={classNames(cls.Input, {}, [className, cls[theme]])}
			value={value}
			onChange={(e) => onHandleChange(e)}
			{...otherProps}
		>

		</input>
	);
});
