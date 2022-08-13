import { useDispatch, useSelector } from 'react-redux';

import routes from '../routes';
import { storeProps, routeItemType } from '../types';
import actions from '../store/actions';

const useRoutes = () => {
    const { route } = useSelector((store: storeProps) => store);
    const dispatch = useDispatch();

    return {
        route,
        routes,
        setRoute: (route: routeItemType) => dispatch(actions.setRoute(route)),
    };
};

export default useRoutes;
