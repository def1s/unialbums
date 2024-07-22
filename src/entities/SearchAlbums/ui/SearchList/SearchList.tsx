import cls from './SearchList.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { SearchField } from '../SearchField/SearchField';
import { SearchFieldItem } from '../../model/types/searchField';

interface SearchListProps {
    className?: string;
	items: SearchFieldItem[];
}

export const SearchList = (props: SearchListProps) => {
	const {
		className,
		items
	} = props;

	const list = items.map(album => {
		return <SearchField key={album.cover} cover={album.cover} title={album.title} artists={album.artists} />;
	});
    
	return (
		<div className={classNames(cls.SearchList, {}, [className])}>
			{
				...list
			}
		</div>
	);
};
