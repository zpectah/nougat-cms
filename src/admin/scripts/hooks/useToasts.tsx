import { useDispatch, useSelector } from 'react-redux';

import { TOAST_DEFAULT_TIMEOUT } from '../const';
import { storeProps, toastItemType } from '../types';
import actions from '../store/actions';

const useToasts = () => {
    const { toasts } = useSelector((store: storeProps) => store);
    const dispatch = useDispatch();

    return {
        toasts: toasts.slice().reverse(),
        createToast: (data: toastItemType) => dispatch(actions.addToast({
            ...data,
        })),
        createSuccessToast: (data: toastItemType) => dispatch(actions.addToast({
            context: 'success',
            timeout: TOAST_DEFAULT_TIMEOUT,
            ...data,
        })),
        createErrorToast: (data: toastItemType) => dispatch(actions.addToast({
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
