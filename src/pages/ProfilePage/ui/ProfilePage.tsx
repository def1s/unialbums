import cls from './ProfilePage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { profileReducer } from 'entities/Profile';

interface ProfilePageProps {
    className?: string
}

const reducers: ReducerList = {
	profile: profileReducer
};

const ProfilePage = ({ className }: ProfilePageProps) => {

	return (
		<DynamicModuleLoader reducers={reducers}>
			<div className={classNames(cls.ProfilePage, {}, [className])}>

			</div>
		</DynamicModuleLoader>
	);
};

export default ProfilePage;
