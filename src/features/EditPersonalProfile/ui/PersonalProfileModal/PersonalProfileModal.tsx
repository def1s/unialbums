import { memo } from 'react';
import { Modal } from 'shared/ui/Modal/Modal';
import { PersonalProfileForm } from '../PersonalProfileForm/PersonalProfileForm';

interface PersonalProfileModalProps {
    className?: string;
	isOpen: boolean;
	onClose: () => void;
}

export const PersonalProfileModal = memo((props: PersonalProfileModalProps) => {
	const {
		isOpen,
		onClose
	} = props;

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
		>
			<PersonalProfileForm/>
		</Modal>
	);
});
