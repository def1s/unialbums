import cls from './EditableAlbumRating.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

interface EditableAlbumRatingProps {
	className?: string;
}

export const EditableAlbumRating = (props: EditableAlbumRatingProps) => {
	const {
		className
	} = props;

	return (
		<div className={classNames(cls.EditableAlbumRating, {}, [className])}>

		</div>
	);
};
