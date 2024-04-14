import cls from './AddAlbumPage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

interface AddAlbumPageProps {
    className?: string
}

export const AddAlbumPage = ({ className }: AddAlbumPageProps) => {

	return (
		<div className={classNames(cls.AddAlbumPage, {}, [className])}>

		</div>
	);
};
