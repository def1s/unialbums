import { ChangeEvent, InputHTMLAttributes, memo } from 'react';
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

export enum ThemeInput {
	LIGHT_BG = 'lightBg',
	ONLY_BORDER = 'onlyBorder',
	ONLY_BOTTOM_BORDER = 'onlyBottomBorder'
}

interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string | number;
	onChange?: (value: string) => void;
	theme?: ThemeInput;
	readonly?: boolean;
	error?: string;
}


export const Input = memo((props: InputProps) => {
	const {
		className,
		value,
		onChange,
		theme = ThemeInput.LIGHT_BG,
		readonly,
		error,
		...otherProps
	} = props;

	const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
	};

	const additional = [
		className,
		cls[theme]
	];

	const mods: Record<string, boolean | undefined> = {
		[cls.readonly]: readonly,
		[cls.error]: !!error?.length
	};

	return (
		<>
			{error && <div className={cls.errorMessage}>{error}</div>}
			<input
				className={classNames(cls.Input, mods, additional)}
				value={value}
				onChange={(e) => onHandleChange(e)}
				readOnly={readonly}
				{...otherProps}
			>
			</input>
		</>
	);
});
