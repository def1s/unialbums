import cls from './RangeSlider.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { ChangeEvent, InputHTMLAttributes } from 'react';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

interface RangeSliderProps extends HTMLInputProps{
	value: number;
	defaultValue: number;
	min: number;
	max: number;
	name?: string;
	onChange: (value: number, field?: string) => void;
    className?: string
}

export const RangeSlider = (props: RangeSliderProps) => {
	const {
		value,
		defaultValue,
		min,
		max,
		onChange,
		name,
		className,
		...otherProps
	} = props;

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(+e.target.value, name);
	};

	return (
		<div className={classNames(cls.RangeSlider, {}, [className])}>
			<input
				type="range"
				min={min}
				max={max}
				defaultValue={defaultValue}
				value={value}
				name={name}
				onChange={e => handleChange(e)}
				{...otherProps}
			/>
		</div>
	);
};
