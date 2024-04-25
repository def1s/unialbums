import cls from './EditableProfileCard.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Profile, ProfileFieldType } from 'entities/Profile/model/types/profile';
import { ProfileField } from 'entities/Profile';

interface EditableProfileCardProps {
    className?: string;
	data?: Profile;
	isLoading?: boolean;
	error?: string;
	readonly?: boolean;
	fields: ProfileFieldType[]
}

export const EditableProfileCard = (props: EditableProfileCardProps) => {
	const {
		className,
		data,
		isLoading,
		error,
		readonly,
		fields
	} = props;

	return (
		<div className={classNames(cls.EditableProfileCard, {}, [className])}>
			<div className={cls.fields}>
				{
					fields.map(field => (
						<ProfileField
							label={field.label}
							fieldValue={field.value}
							key={field.label}
							readonly={readonly}
						/>
					))
				}
			</div>
		</div>
	);
};
