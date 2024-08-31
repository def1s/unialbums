import { memo, ReactNode } from 'react';
import DefaultAvatar from 'shared/assets/icons/default-avatar.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { textLengthValidation } from 'shared/lib/textLengthValidator/textLengthValidator';
import { IProfile } from 'shared/types';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text } from 'shared/ui/Text/Text';
import { ValidateProfileError, ValidateProfileErrorKeys } from '../../model/types/personalProfile';
import { PersonalProfileField } from '../PersonalProfileField/PersonalProfileField';
import cls from './PersonalProfileCard.module.scss';

interface PersonalProfileCardProps {
    className?: string;
	data?: IProfile;
	isLoading?: boolean;
	validateErrors?: ValidateProfileError;
	EditFeature?: ReactNode;
}

export const PersonalProfileCard = memo((props: PersonalProfileCardProps) => {
	const {
		className,
		data,
		isLoading,
		validateErrors,
		EditFeature
	} = props;

	// ошибки
	const validateErrorsTranslates: Record<ValidateProfileErrorKeys, string> = {
		INCORRECT_FIRSTNAME: 'Некорректно заполнено имя',
		INCORRECT_LASTNAME: 'Некорректно заполнена фамилия',
		INCORRECT_USERNAME: 'Некорректно заполнено имя пользователя'
	};

	if (isLoading) {
		return (
			<div className={classNames(cls.ProfileCard, {}, [className])}>
				<Loader/>
			</div>
		);
	}

	const renderAvatar = () => {
		if (data?.avatar) {
			return (
				<Avatar
					src={data?.avatar}
				/>
			);
		} else {
			return <DefaultAvatar className={cls.avatar}/>;
		}
	};

	return (
		<div className={classNames(cls.PersonalProfileCard, {}, [className])}>
			<div className={cls.userBlock}>
				{/* аватарка */}
				{renderAvatar()}
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
					<PersonalProfileField
						label={'Имя'}
						fieldValue={data?.firstName}
					/>

					<PersonalProfileField
						label={'Фамилия'}
						fieldValue={data?.lastName}
					/>

					<PersonalProfileField
						label={'Имя пользователя'}
						fieldValue={data?.username}
					/>
				</div>

				<div className={cls.editButton}>
					{EditFeature}
				</div>
			</div>
		</div>
	);
});
