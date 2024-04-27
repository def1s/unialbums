import cls from './ProfileCard.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Profile, ProfileFieldType, ProfileKey } from 'entities/Profile/model/types/profile';
import { ProfileField } from 'entities/Profile';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text, ThemeText } from 'shared/ui/Text/Text';
import { Loader } from 'shared/ui/Loader/Loader';
import { memo } from 'react';
import { textLengthValidation } from 'shared/lib/textLengthValidator/textLengthValidator';

interface ProfileCardProps {
    className?: string;
	data?: Profile;
	isLoading?: boolean;
	error?: string;
	readonly?: boolean;
	fields: ProfileFieldType[];
	onChangeField: (field: ProfileKey, value: string | number) => void;
}

export const ProfileCard = memo((props: ProfileCardProps) => {
	const {
		className,
		data,
		isLoading,
		error,
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

	if (error) {
		return (
			<div className={classNames(cls.ProfileCard, {}, [className])}>
				<Text
					title={'Произошла ошибка'}
					text={error}
					theme={ThemeText.ERROR}
				/>
			</div>
		);
	}

	return (
		<div className={classNames(cls.ProfileCard, {}, [className])}>
			<div className={cls.userBlock}>
				<Avatar
					src={data?.avatar}
				/>
				<div className={cls.username}>{textLengthValidation(data?.username || '')}</div>
				<div className={cls.person}>{textLengthValidation(data?.firstName + ' ' + data?.lastName, 26)}</div>
			</div>

			<div className={cls.wrapper}>
				<Text
					title={'Персональная информация'}
					text={'Здесь вы можете изменить персональную информацию о себе'}
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