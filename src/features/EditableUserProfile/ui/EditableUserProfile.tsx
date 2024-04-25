import cls from './EditableUserProfile.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { EditableProfileCard } from 'entities/Profile';
import { useSelector } from 'react-redux';
import { getProfileFields } from '../model/selectors/getProfileFields/getProfileFields';
import { getProfileData } from '../model/selectors/getProfileData/getProfileData';
import {
	getProfileIsLoading
} from '../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from '../model/selectors/getProfileError/getProfileError';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getProfileReadonly } from '../model/selectors/getProfileReadonly/getProfileReadonly';

interface EditableUserProfileProps {
    className?: string;
}

export const EditableUserProfile = ({ className }: EditableUserProfileProps) => {
	const profileFields = useSelector(getProfileFields);
	const data = useSelector(getProfileData);
	const isLoading = useSelector(getProfileIsLoading);
	const error = useSelector(getProfileError);
	const readonly = useSelector(getProfileReadonly);

	const dispatch = useAppDispatch();

	return (
		<div className={classNames(cls.EditableUserProfile, {}, [className])}>
			<EditableProfileCard
				fields={profileFields}
				readonly={readonly}
				data={data}
			/>
		</div>
	);
};
