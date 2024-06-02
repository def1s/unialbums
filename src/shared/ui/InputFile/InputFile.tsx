import cls from './InputFile.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { ChangeEvent, InputHTMLAttributes, memo } from 'react';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

export enum InputFileShape {
	SQUARE = 'square',
	CIRCLE = 'circle'
}

interface InputFileProps extends HTMLInputProps {
	selectedFile?: string;
    className?: string;
	onChange?: (file: ChangeEvent<HTMLInputElement>) => void;
	onRemove?: () => void;
	label: string;
	shape?: InputFileShape;
}

export const InputFile = memo((props: InputFileProps) => {
	const {
		selectedFile,
		className,
		onChange,
		onRemove,
		label,
		shape = InputFileShape.SQUARE,
		...otherProps
	} = props;

	const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange(e);
		}
	};

	const additional = [
		className,
		cls[shape]
	];

	return (
		<div className={classNames(cls.InputFile, {}, additional)}>
			<input
				type="file"
				id='fileInput'
				className={cls.input}
				onChange={e => onHandleChange(e)}
				{...otherProps}
			/>
			{
				!selectedFile && (
					<label htmlFor="fileInput" className={cls.inputLabel}>
						{label}
					</label>
				)
			}
			{
				selectedFile && (
					<div className={cls.imageContainer}>
						<img src={selectedFile} alt="Uploaded" className={cls.image}/>
						<button onClick={onRemove} className={cls.removeButton}>×</button>
					</div>
				)
			}
		</div>
	);
});
