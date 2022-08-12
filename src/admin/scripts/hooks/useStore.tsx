import { useDispatch, useSelector } from 'react-redux';

import { storeProps } from '../types';

const useStore = () => {
    const store = useSelector((store: storeProps) => store);
    const dispatch = useDispatch();

    return {
        store,
        dispatch,
    };
};

export default useStore;
