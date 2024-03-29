import { createPortal } from 'react-dom';
import { ReactNode } from 'react';

interface PortalProps {
    children: ReactNode;
	element?: HTMLElement
}

export const Portal = (props: PortalProps) => {
	const {
		children,
		element = document.body
	} = props;

	return createPortal(children, element);
};
