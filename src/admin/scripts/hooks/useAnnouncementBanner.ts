import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { storeProps } from '../types';
import actions from '../store/actions';

const useAnnouncementBanner = () => {
    const { announcementBanner } = useSelector((store: storeProps) => store);
    const dispatch = useDispatch();

    return {
        banner: announcementBanner,
        addBanner: (node: React.ReactNode) => dispatch(actions.setAnnouncement(node)),
        removeBanner: () => dispatch(actions.setAnnouncement(null)),
    };
};

export default useAnnouncementBanner;
