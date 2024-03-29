import cls from './Modal.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Portal } from 'shared/ui/Portal/Portal';
import { MouseEvent, ReactNode } from 'react';

interface ModalProps {
    className?: string;
	children: ReactNode;
	onClose?: () => void;
	isOpen?: boolean;
}

export const Modal = (props: ModalProps) => {
	const {
		children,
		className,
		onClose,
		isOpen
	} = props;

	const onClickContent = (e: MouseEvent) => {
		e.stopPropagation();
	};

	const mods: Record<string, boolean> = {
		[cls.isOpen]: isOpen
	};

	return (
		<Portal>
			<div className={classNames(cls.Modal, { ...mods }, [className])}>
				<div
					className={cls.overlay}
					onClick={onClose}
				>
					<div
						className={cls.content}
						onClick={(e) => onClickContent(e)}
					>
						{children}
					</div>
				</div>
			</div>
		</Portal>
	);
};
