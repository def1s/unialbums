import cls from './ProfilePage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { profileReducer } from 'features/EditableUserProfile';
import { EditableUserProfile } from 'features/EditableUserProfile/ui/EditableUserProfile';

interface ProfilePageProps {
    className?: string
}

const reducers: ReducerList = {
	profile: profileReducer
};

const ProfilePage = ({ className }: ProfilePageProps) => {

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<div className={classNames(cls.ProfilePage, {}, [className])}>
				<EditableUserProfile/>
			</div>
		</DynamicModuleLoader>
	);
};

export default ProfilePage;
