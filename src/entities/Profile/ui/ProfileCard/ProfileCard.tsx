import cls from './ProfileCard.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Profile, ProfileFieldType, ProfileKey } from '../../model/types/profile';
import { ProfileField } from 'entities/Profile';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text } from 'shared/ui/Text/Text';
import { Loader } from 'shared/ui/Loader/Loader';
import { memo } from 'react';
import { textLengthValidation } from 'shared/lib/textLengthValidator/textLengthValidator';
import DefaultAvatar from 'shared/assets/icons/default-avatar.svg';

interface ProfileCardProps {
    className?: string;
	data?: Profile;
	isLoading?: boolean;
	readonly?: boolean;
	fields: ProfileFieldType[];
	onChangeField: (field: ProfileKey, value: string | number) => void;
}

export const ProfileCard = memo((props: ProfileCardProps) => {
	const {
		className,
		data,
		isLoading,
		readonly,
		fields,
		onChangeField
	} = props;

	if (isLoading) {
		return (
			<div className={classNames(cls.ProfileCard, {}, [className])}>
				<Loader/>
			</div>
		);
	}

	return (
		<div className={classNames(cls.ProfileCard, {}, [className])}>
			<div className={cls.userBlock}>
				{
					data?.avatar ?
						<Avatar
							src={data?.avatar}
						/>
						:
						<DefaultAvatar className={cls.avatar}/>
				}
				<div className={cls.username}>{textLengthValidation(data?.username || '')}</div>
				<div className={cls.person}>
					{textLengthValidation(data?.firstName + ' ' + data?.lastName, 26)}
				</div>
			</div>

			<div className={cls.wrapper}>
				<Text
					title={'Персональная информация'}
					text={'Здесь вы можете изменить персональную информацию о себе'}
					className={cls.description}
				/>
				<div className={cls.fields}>
					{
						fields.map(({ value, label, fieldName }) => (
							<ProfileField
								label={label}
								fieldValue={value}
								key={label}
								readonly={readonly}
								onChangeField={onChangeField}
								fieldName={fieldName}
							/>
						))
					}
				</div>
			</div>
		</div>
	);
});
