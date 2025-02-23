import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserAuthData } from 'entities/User';
import { classNames } from 'shared/lib/classNames/classNames';
import { fetchSells } from '../api/api';
import cls from './AdminPage.module.scss';

interface HomePageProps {
    className?: string
}

export const AdminPage = ({ className }: HomePageProps) => {
	const [sells, setSells] = useState([]);
	const navigate = useNavigate();
	const currentUser = useSelector(getUserAuthData);

	useEffect(() => {
		if (currentUser.username !== 'admin')
			navigate('/home');

		fetchSells().then((res) => {
			setSells(res);
		});
	}, []);

	return (
		<div className={classNames(cls.HomePage, {}, [className])}>
			<div className={cls.wrapper}>
				Список продаж
			</div>

			<div className={cls.list}>
				{sells.map((sell, index) => (
					<div className={cls.sells} key={index}>
						<div>
							{index + 1}
						</div>
						<div>
							{sell.user.username}
						</div>
						<div>
							{sell.album.title}
						</div>
						<div>
							{sell.album.artist}
						</div>
						<div>
							{sell.album.category}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

