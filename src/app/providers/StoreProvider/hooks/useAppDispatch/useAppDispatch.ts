import { AppDispatch } from '../../ui/StoreProvider';
import { useDispatch } from 'react-redux';

// переопределяю dispatch для того, чтобы он мог принимать в себя asyncThunk в качестве action
// этот код импортируется из нижележащих слоев, что нарушает архитектуру FSD
export const useAppDispatch: () => AppDispatch = useDispatch;
