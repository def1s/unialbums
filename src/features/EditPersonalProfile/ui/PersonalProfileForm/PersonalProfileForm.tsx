import React, { ChangeEvent, FormEvent, memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getPersonalProfileData } from 'entities/PersonalProfile';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useImage } from 'shared/lib/hooks/useImage/useImage';
import { Blur } from 'shared/ui/Blur/Blur';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { InputFile, InputFileShape } from 'shared/ui/InputFile/InputFile';
import { Loader } from 'shared/ui/Loader/Loader';
import { getPersonalProfileFormForm, getPersonalProfileFormIsLoading } from '../../model/selectors/selectors';
import {
	updatePersonalProfileData
} from '../../model/services/updatePersonalProfileData/updatePersonalProfileData';
import { personalProfileFormActions, personalProfileFormReducer } from '../../model/slice/personalProfileFormSlice';
import cls from './PersonalProfileForm.module.scss';

interface PersonalProfileFormProps {
    className?: string;
}

const initialReducers: ReducerList = {
	personalProfileForm: personalProfileFormReducer
};

export const PersonalProfileForm = memo((props: PersonalProfileFormProps) => {
	const {
		className
	} = props;

	const dispatch = useAppDispatch();
	const { onCreateImage, localUrlImage, onDeleteImage } = useImage();

	const profileData = useSelector(getPersonalProfileData);
	const profileForm = useSelector(getPersonalProfileFormForm);
	const isLoading = useSelector(getPersonalProfileFormIsLoading);

	useEffect(() => {
		if (profileData) {
			dispatch(personalProfileFormActions.initPersonalProfileForm(profileData));
		}
	}, [dispatch, profileData]);

	const onChangeFirstName = useCallback((firstName: string) => {
		dispatch(personalProfileFormActions.updatePersonalProfileForm({ firstName }));
	}, [dispatch]);

	const onChangeLastName = useCallback((lastName: string) => {
		dispatch(personalProfileFormActions.updatePersonalProfileForm({ lastName }));
	}, [dispatch]);

	const onChangeCover = useCallback((avatar: string) => {
		dispatch(personalProfileFormActions.updatePersonalProfileForm({ avatar }));
	}, [dispatch]);

	/**
	 * Для работы с изображениями использую кастомный хук.
	 * Хук предоставляет возможность создать локальную ссылку на изображение,
	 * чтобы ее можно было поместить в слайс.
	 * Также ссылку можно удалить, вместе с этим стерев изображение.
	 */
	const onCoverAdd = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		onCreateImage(e);
		onChangeCover(localUrlImage.current);
	}, [localUrlImage, onChangeCover, onCreateImage]);

	const onCoverDelete = useCallback(() => {
		onDeleteImage();
		onChangeCover('');
	}, [onChangeCover, onDeleteImage]);

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(updatePersonalProfileData());
	};

	return (
		<DynamicModuleLoader
			reducers={initialReducers}
			removeAfterUnmount
		>
			<form
				className={classNames(cls.PersonalProfileForm, {}, [className])}
				onSubmit={onSubmit}
			>
				{
					isLoading && (
						<>
							<Loader/>
							<Blur className={cls.blurBorder}/>
						</>
					)
				}

				<InputFile
					label='Аватарка'
					selectedFile={profileForm?.avatar}
					shape={InputFileShape.CIRCLE}
					onChange={onCoverAdd}
					onRemove={onCoverDelete}
				/>

				<Input
					type='text'
					label={'Имя'}
					onChange={onChangeFirstName}
					className={cls.textInput}
					value={profileForm?.firstName}
				/>

				<Input
					type='text'
					label={'Фамилия'}
					onChange={onChangeLastName}
					className={cls.textInput}
					value={profileForm?.lastName}
				/>

				<Button className={cls.submitBtn}>Сохранить</Button>
			</form>
		</DynamicModuleLoader>
	);
});
