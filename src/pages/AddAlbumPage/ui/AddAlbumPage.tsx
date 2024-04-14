import cls from './AddAlbumPage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { AlbumForm } from 'features/AddAlbum';

interface AddAlbumPageProps {
    className?: string
}

export const AddAlbumPage = ({ className }: AddAlbumPageProps) => {

	return (
		<div className={classNames(cls.AddAlbumPage, {}, [className])}>
			<AlbumForm/>
		</div>
	);
};
