import cls from './EditableProfileCard.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Profile, ProfileFieldType } from 'entities/Profile/model/types/profile';
import { ProfileField } from 'entities/Profile';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text, ThemeText } from 'shared/ui/Text/Text';
import { Loader } from 'shared/ui/Loader/Loader';

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

	if (isLoading) {
		return (
			<div className={classNames(cls.EditableProfileCard, {}, [className])}>
				<Loader/>
			</div>
		);
	}

	if (error) {
		return (
			<div className={classNames(cls.EditableProfileCard, {}, [className])}>
				<Text
					title={'Произошла ошибка'}
					text={error}
					theme={ThemeText.ERROR}
				/>
			</div>
		);
	}

	return (
		<div className={classNames(cls.EditableProfileCard, {}, [className])}>
			<div className={cls.userBlock}>
				<Avatar
					src={data?.avatar}
				/>
				<div className={cls.username}>{data?.username}</div>
				<div className={cls.person}>{data?.firstName} {data?.lastName}</div>
			</div>

			<div className={cls.wrapper}>
				<Text
					title={'Персональная информация'}
					text={'Здесь вы можете изменить персональную информацию о себе'}
				/>
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
		</div>
	);
};
