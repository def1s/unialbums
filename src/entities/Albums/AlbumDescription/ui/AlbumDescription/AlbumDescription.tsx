import React, { memo, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { textLengthValidation } from 'shared/lib/textLengthValidator/textLengthValidator';
import { IAlbumDescription } from 'shared/types';
import { Blur } from 'shared/ui/Blur/Blur';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import cls from './AlbumDescription.module.scss';

interface AlbumDescriptionProps {
	/** Данные альбома, включающие название, исполнителя, обложку и рейтинги */
	data?: IAlbumDescription;
	/** Дополнительный класс для кастомизации стилей компонента */
	className?: string;
	/** Флаг, указывающий, что данные загружаются */
	isLoading?: boolean;
	/** Дополнительный функционал редактирования, передаваемый как дочерний элемент */
	error?: string;
	EditFeature?: ReactNode;
	DeleteFeature?: ReactNode;
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
		isLoading,
		error,
		EditFeature,
		DeleteFeature
	} = props;

	const renderContent = () => {
		if (isLoading) {
			return (
				<>
					<Loader/>
					<Blur/>
				</>
			);
		} else if (error) {
			return (
				<Text
					className={cls.error}
					title={'Произошла ошибка!'}
					text={error}
					theme={TextTheme.ERROR}
					align={TextAlign.CENTER}
				/>
			);
		} else {
			return (
				<>
					<div className={cls.cover}>
						{/* Отображение обложки альбома */}
						<img src={data?.cover} alt="Обложка альбома"/>
					</div>

					{/*TODO Сделать, чтобы при превышении количества символов текст уменьшался пропорционально размеру*/}
					<div className={cls.wrapper}>
						<div className={cls.title}>{textLengthValidation(data?.title || '', 40)}</div>
						<div className={cls.artist}>{textLengthValidation(data?.artist || '', 40)}</div>
						{/*<div className={cls.year}>{data.year}</div>*/}
					</div>

					<div className={cls.editButtons}>
						{EditFeature}
						{DeleteFeature}
					</div>
				</>
			);
		}
	};

	return (
		<div className={classNames(cls.AlbumDescription, {}, [className])}>
			{renderContent()}
		</div>
	);
});
