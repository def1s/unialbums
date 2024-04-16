import { useDispatch } from 'react-redux';
import { AppDispatch } from 'app/providers/StoreProvider';

// типизированный dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
