import cls from './Input.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { ChangeEvent, InputHTMLAttributes } from 'react';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

export enum ThemeInput {
	LIGHT_BG = 'lightBg'
}

interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string;
	onChange?: (value: string) => void;
	theme?: ThemeInput;
}


export const Input = (props: InputProps) => {
	const {
		className,
		value,
		onChange,
		theme = ThemeInput.LIGHT_BG,
		...otherProps
	} = props;

	const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
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
};
