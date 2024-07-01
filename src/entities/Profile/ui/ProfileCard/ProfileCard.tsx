import cls from './ProfileCard.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Profile, ValidateProfileError, ValidateProfileErrorKeys } from '../../model/types/profile';
import { ProfileField } from 'entities/Profile';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text } from 'shared/ui/Text/Text';
import { Loader } from 'shared/ui/Loader/Loader';
import { ChangeEvent, memo } from 'react';
import { textLengthValidation } from 'shared/lib/textLengthValidator/textLengthValidator';
import DefaultAvatar from 'shared/assets/icons/default-avatar.svg';
import { InputFile, InputFileShape } from 'shared/ui/InputFile/InputFile';

interface ProfileCardProps {
    className?: string;
	data?: Profile;
	isLoading?: boolean;
	readonly?: boolean;
	validateErrors?: ValidateProfileError;
	onChangeFirstName?: (value: string) => void;
	onChangeLastName?: (value: string) => void;
	onChangeUsername?: (value: string) => void;
	onAddAvatar?: (file: ChangeEvent<HTMLInputElement>) => void;
	onDeleteAvatar?: () => void;
}

export const ProfileCard = memo((props: ProfileCardProps) => {
	const {
		className,
		data,
		isLoading,
		readonly,
		validateErrors,
		onChangeFirstName,
		onChangeLastName,
		onChangeUsername,
		onAddAvatar,
		onDeleteAvatar
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

	const avatar =
		<>
			{
				readonly ?
					data?.avatar ?
						<Avatar
							src={data?.avatar}
						/>
						:
						<DefaultAvatar className={cls.avatar}/>
					:
					<InputFile
						label={'Аватарка'}
						selectedFile={data?.avatar}
						shape={InputFileShape.CIRCLE}
						onChange={onAddAvatar}
						onRemove={onDeleteAvatar}
					/>
			}
		</>;

	return (
		<div className={classNames(cls.ProfileCard, {}, [className])}>
			<div className={cls.userBlock}>
				{/* аватарка */}
				{ avatar }
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
					<ProfileField
						label={'Имя'}
						error={validateErrors?.INCORRECT_FIRSTNAME ? validateErrorsTranslates.INCORRECT_FIRSTNAME : undefined}
						fieldValue={data?.firstName}
						onChangeField={onChangeFirstName}
						readonly={readonly}
					/>

					<ProfileField
						label={'Фамилия'}
						error={validateErrors?.INCORRECT_LASTNAME ? validateErrorsTranslates.INCORRECT_LASTNAME : undefined}
						fieldValue={data?.lastName}
						onChangeField={onChangeLastName}
						readonly={readonly}
					/>

					<ProfileField
						label={'Имя пользователя'}
						fieldValue={data?.username}
						error={validateErrors?.INCORRECT_USERNAME ? validateErrorsTranslates.INCORRECT_USERNAME : undefined}
						onChangeField={onChangeUsername}
						readonly={readonly}
					/>
				</div>
			</div>
		</div>
	);
});
