import { AlbumForm } from 'features/AddAlbum';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AddAlbumPage.module.scss';

interface AddAlbumPageProps {
    className?: string
}

const AddAlbumPage = ({ className }: AddAlbumPageProps) => {

	return (
		<div className={classNames(cls.AddAlbumPage, {}, [className])}>
			<AlbumForm/>
		</div>
	);
};

export default AddAlbumPage;
