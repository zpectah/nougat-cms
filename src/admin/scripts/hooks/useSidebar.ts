import { useDispatch, useSelector } from 'react-redux';

import { KEYS } from '../const';
import { storeProps } from '../types';
import actions from '../store/actions';

const useSidebar = () => {
    const { sidebar } = useSelector((store: storeProps) => store);
    const dispatch = useDispatch();
    const body = window.document.body;

    return {
        sidebarOpen: sidebar,
        toggleSidebar: () => {
            const state = !sidebar;
            localStorage.setItem(KEYS.APP_SIDEBAR, String(state));
            body.classList.toggle('sidebar-open', state);
            dispatch(actions.sidebarToggle(state));
        },
        sidebarInit: () => {
            const state = localStorage.getItem(KEYS.APP_SIDEBAR) === 'true';
            if (state) body.classList.toggle('sidebar-open', true);
        },
    };
};

export default useSidebar;
