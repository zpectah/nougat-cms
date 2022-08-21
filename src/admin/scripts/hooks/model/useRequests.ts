import { RequestsItemProps } from '../../types';

const useRequests = () => {
    const items: RequestsItemProps[] = [];

    return {
        Requests: items,
        loadRequests: () => { console.log('loadRequests') },
        createRequests: () => { console.log('createRequests') },
        updateRequests: () => { console.log('updateRequests') },
        toggleRequests: () => { console.log('toggleRequests') },
        deleteRequests: () => { console.log('deleteRequests') },
    };
};

export default useRequests;
