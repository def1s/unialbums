import cls from './SearchField.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { SearchFieldItem } from '../../model/types/searchField';
import { memo } from 'react';

interface SearchFieldProps extends SearchFieldItem {
    className?: string;
	onClick?: () => void;
}

export const SearchField = memo((props: SearchFieldProps) => {
	const {
		className,
		cover,
		title,
		artists,
		onClick
	} = props;

	return (
		<div
			className={classNames(cls.SearchField, {}, [className])}
			onMouseDown={onClick}
		>
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
});
