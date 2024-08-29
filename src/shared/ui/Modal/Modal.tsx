import { MouseEvent, ReactNode } from 'react';
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { classNames } from 'shared/lib/classNames/classNames';
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { Portal } from 'shared/ui/Portal/Portal';
import cls from './Modal.module.scss';

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

	const mods: Record<string, boolean | undefined> = {
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
