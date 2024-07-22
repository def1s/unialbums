import cls from './SearchField.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { SearchFieldItem } from '../../model/types/searchField';

interface SearchFieldProps extends SearchFieldItem {
    className?: string;
}

export const SearchField = (props: SearchFieldProps) => {
	const {
		className,
		cover,
		title,
		artists
	} = props;
    
	return (
		<div className={classNames(cls.SearchField, {}, [className])}>
			<div className={cls.cover}>
				<img
					alt={'Картинка поискового запроса'}
					src={cover}
				/>
			</div>

			<div className={cls.title}>{title}</div>
			<div className={cls.artists}>{artists}</div>
		</div>
	);
};
