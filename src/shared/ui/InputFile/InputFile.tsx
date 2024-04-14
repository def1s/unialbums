import cls from './InputFile.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { ChangeEvent, InputHTMLAttributes } from 'react';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

interface InputFileProps extends HTMLInputProps {
	selectedFile?: string;
    className?: string;
	onChange?: (file: ChangeEvent<HTMLInputElement>) => void;
	onRemove?: () => void;
	label: string;
}

export const InputFile = (props: InputFileProps) => {
	const {
		selectedFile,
		className,
		onChange,
		onRemove,
		label,
		...otherProps
	} = props;

	return (
		<div className={classNames(cls.InputFile, {}, [className])}>
			<input
				type="file"
				id='fileInput'
				className={cls.input}
				onChange={e => onChange(e)}
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
};
