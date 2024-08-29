import cls from './AlbumDescription.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import React, { ChangeEvent, memo, ReactNode, useMemo } from 'react';
import { textLengthValidation } from 'shared/lib/textLengthValidator/textLengthValidator';
import { Input, ThemeInput } from 'shared/ui/Input/Input';
import { IAlbumDescription } from '../../model/types/album';
import { Loader } from 'shared/ui/Loader/Loader';
import { Blur } from 'shared/ui/Blur/Blur';
import { InputFile } from 'shared/ui/InputFile/InputFile';

interface AlbumDescriptionProps {
	/** Данные альбома, включающие название, исполнителя, обложку и рейтинги */
	data?: IAlbumDescription;
	/** Дополнительный класс для кастомизации стилей компонента */
	className?: string;
	/** Флаг, указывающий, что поля компонента только для чтения */
	readonly?: boolean;
	/** Флаг, указывающий, что данные загружаются */
	isLoading?: boolean;
	/** Обработчик изменения названия альбома */
	onChangeTitle?: (value: string) => void;
	/** Обработчик изменения имени исполнителя */
	onChangeArtist?: (value: string) => void;
	/** Обработчик добавления обложки альбома */
	onAddCover?: (file: ChangeEvent<HTMLInputElement>) => void;
	/** Обработчик удаления обложки альбома */
	onDeleteCover?: () => void;
	/** Дополнительный функционал редактирования, передаваемый как дочерний элемент */
	EditFeature?: ReactNode;
}

/**
 * Компонент для отображения и редактирования описания альбома.
 *
 * @param {AlbumDescriptionProps} props Свойства компонента.
 * @returns {React.ReactNode} JSX элемент.
 */
export const AlbumDescription = memo((props: AlbumDescriptionProps): React.ReactNode => {
	const {
		data,
		className,
		readonly = true,
		isLoading,
		EditFeature,
		onChangeArtist,
		onChangeTitle,
		onAddCover,
		onDeleteCover
	} = props;

	if (isLoading) {
		return (
			<div className={classNames(cls.AlbumDescription, {}, [className])}>
				<Loader/>
				<Blur/>
			</div>
		);
	}

	if (readonly) {
		return (
			<div className={classNames(cls.AlbumDescription, {}, [className])}>
				<div className={cls.cover}>
					{/* Отображение обложки альбома */}
					<img src={data?.cover} alt="Обложка альбома"/>
				</div>

				{/* Отображение информации об альбоме с валидацией на длину полей */}
				<div className={cls.wrapper}>
					<div className={cls.title}>{textLengthValidation(data?.title || '', 25)}</div>
					<div className={cls.artist}>{textLengthValidation(data?.artist || '', 25)}</div>
					{/*<div className={cls.year}>{data.year}</div>*/}
				</div>

				<div className={cls.editButtons}>
					{EditFeature}
				</div>
			</div>
		);
	} else {
		return (
			<div className={classNames(cls.AlbumDescription, {}, [className])}>
				{/* Отображение обложки альбома */}
				{/*<img src={data?.cover} alt="Обложка альбома"/>*/}
				<InputFile
					// className={cls.cover}
					label={'Обложка'}
					selectedFile={data?.cover}
					onChange={onAddCover}
					onRemove={onDeleteCover}
				/>

				<div className={cls.wrapper}>
					<Input
						className={cls.title}
						value={data?.title}
						theme={ThemeInput.ONLY_BOTTOM_BORDER}
						onChange={onChangeTitle}
					/>

					<Input
						className={cls.artist}
						value={data?.artist}
						theme={ThemeInput.ONLY_BOTTOM_BORDER}
						onChange={onChangeArtist}
					/>
				</div>

				<div className={cls.editButtons}>
					{EditFeature}
				</div>
			</div>
		);
	}
});
