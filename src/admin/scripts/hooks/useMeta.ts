import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { paths } from '../config';
import { storeProps } from '../types';
import actions from '../store/actions';

const useMeta = () => {
    const { meta } = useSelector((store: storeProps) => store);
    const dispatch = useDispatch();

    // TODO: Temporary calling env.json
    const loadFile = () => axios.get(`${paths.api}/meta`);
    // const loadFile = () => axios.get(`${API_BASE_PATH}meta`,{
    //     headers: {
    //         'content-type': 'application/json',
    //     },
    //     data: {
    //         query: `mutation get_meta()`,
    //         // variables: {},
    //     },
    // });
    //

    return {
        meta,
        loadMeta: () => {
            loadFile().then((res) => {
                const data = res.data.meta;
                dispatch(actions.setMeta(data));
            });
        },
    };
};

export default useMeta;
