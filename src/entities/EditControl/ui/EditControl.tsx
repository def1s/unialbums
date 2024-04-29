import cls from './EditControl.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';

interface EditControlProps {
    className?: string;
	readonly?: boolean;
	onEdit: () => void;
	onSave: () => void;
	onReset?: () => void;
}

export const EditControl = (props: EditControlProps) => {
	const {
		className,
		readonly,
		onEdit,
		onSave,
		onReset
	} = props;

	if (!readonly) {
		return (
			<div className={classNames(cls.EditControl, {}, [className])}>
				<div className={cls.buttonsWrapper}>
					<Button
						className={cls.button}
						onClick={onSave}
					>
						Сохранить
					</Button>

					{onReset && (
						<Button
							className={cls.button}
							onClick={onReset}
						>
							Сбросить изменения
						</Button>
					)}
				</div>
			</div>
		);
	} else {
		return (
			<div className={classNames(cls.EditControl, {}, [className])}>
				<div className={cls.buttonsWrapper}>
					<Button
						className={cls.button}
						onClick={onEdit}
					>
						Редактировать
					</Button>
				</div>
			</div>
		);
	}
};
