import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { EditPersonalProfile } from 'features/EditPersonalProfile';
import {
	fetchPersonalProfileData,
	getPersonalProfileData,
	getPersonalProfileError,
	PersonalProfileCard,
	personalProfileReducer
} from 'entities/PersonalProfile';
import { getPersonalProfileIsLoading } from 'entities/PersonalProfile';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './PersonalProfileDetails.module.scss';

interface PersonalProfileDetailsProps {
    className?: string;
}

const initialReducers: ReducerList = {
	personalProfile: personalProfileReducer
};

export const PersonalProfileDetails = (props: PersonalProfileDetailsProps) => {
	const {
		className
	} = props;

	const dispatch = useAppDispatch();

	const data = useSelector(getPersonalProfileData);
	const isLoading = useSelector(getPersonalProfileIsLoading);
	const error = useSelector(getPersonalProfileError);

	useEffect(() => {
		dispatch(fetchPersonalProfileData());
	}, [dispatch]);
    
	return (
		<DynamicModuleLoader
			reducers={initialReducers}
			removeAfterUnmount
		>
			<div className={classNames(cls.PersonalProfileDetails, {}, [className])}>

				<PersonalProfileCard
					data={data}
					isLoading={isLoading}
					error={error}
					EditFeature={<EditPersonalProfile/>}
				/>

			</div>
		</DynamicModuleLoader>
	);
};
