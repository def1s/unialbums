import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AlbumForm } from 'features/AddAlbum';
import { getUserAuthData } from 'entities/User';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AddAlbumPage.module.scss';

interface AddAlbumPageProps {
    className?: string
}

const AddAlbumPage = ({ className }: AddAlbumPageProps) => {
	const navigate = useNavigate();
	const currentUser = useSelector(getUserAuthData);

	useEffect(() => {
		if (currentUser.username !== 'admin')
			navigate('/home');
	}, []);

	return (
		<div className={classNames(cls.AddAlbumPage, {}, [className])}>
			<AlbumForm/>
		</div>
	);
};

export default AddAlbumPage;
