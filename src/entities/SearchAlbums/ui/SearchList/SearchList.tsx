import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Blur } from 'shared/ui/Blur/Blur';
import { Loader } from 'shared/ui/Loader/Loader';
import { SearchFieldItem } from '../../model/types/searchField';
import { SearchField } from '../SearchField/SearchField';
import cls from './SearchList.module.scss';

interface SearchListProps {
    className?: string;
	items: SearchFieldItem[];
	isLoading?: boolean;
	error?: string;
	onClickItem?: (albumId: string) => void;
}

export const SearchList = memo((props: SearchListProps) => {
	const {
		className,
		items,
		isLoading,
		onClickItem
	} = props;

	// TODO добавить ошибку и как-то обработать
	// пока для этого компонента не придумал красивое решение

	const onClick = useCallback((albumId = '') => {
		if (onClickItem) {
			onClickItem(albumId);
		}
	}, [onClickItem]);

	const list = items.map(album => {
		return (
			<SearchField
				key={album.cover}
				cover={album.cover}
				title={album.title}
				artists={album.artists}
				onClick={() => onClick(album.id)}
			/>
		);
	});

	return (
		<div
			className={classNames(cls.SearchList, { [cls.plugHeight]: isLoading && (items.length === 0) }, [className])}
		>
			{
				isLoading &&
				<>
					<Loader/>
					<Blur/>
				</>
			}

			{...list}
		</div>
	);
});
