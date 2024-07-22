import cls from './SearchList.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { SearchField } from '../SearchField/SearchField';
import { SearchFieldItem } from '../../model/types/searchField';
import { Loader } from 'shared/ui/Loader/Loader';
import { Blur } from 'shared/ui/Blur/Blur';
import { memo, useCallback } from 'react';

interface SearchListProps {
    className?: string;
	items: SearchFieldItem[];
	isLoading?: boolean;
	onClickItem?: (albumId: string) => void;
}

export const SearchList = memo((props: SearchListProps) => {
	const {
		className,
		items,
		isLoading,
		onClickItem
	} = props;

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

			{
				...list
			}
		</div>
	);
});
