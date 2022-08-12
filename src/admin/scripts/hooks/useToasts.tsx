import { useDispatch, useSelector } from 'react-redux';

import { TOAST_DEFAULT_TIMEOUT } from '../const';
import { storeProps, toastItemType } from '../types';
import actions from '../store/actions';

const useToasts = () => {
    const { toasts } = useSelector((store: storeProps) => store);
    const dispatch = useDispatch();
    const getRandomId = () => Math.random().toString(36).substring(2);

    return {
        toasts: toasts.slice().reverse(),
        createToast: (data: toastItemType) => dispatch(actions.addToast({
            id: getRandomId(),
            ...data,
        })),
        createSuccessToast: (data: toastItemType) => dispatch(actions.addToast({
            id: getRandomId(),
            context: 'success',
            timeout: TOAST_DEFAULT_TIMEOUT,
            ...data,
        })),
        createErrorToast: (data: toastItemType) => dispatch(actions.addToast({
            id: getRandomId(),
            context: 'error',
            timeout: (TOAST_DEFAULT_TIMEOUT * 2),
            ...data,
        })),
        removeToast: (id: string) => dispatch(actions.removeToast({
            id,
        })),
    };
};

export default useToasts;
