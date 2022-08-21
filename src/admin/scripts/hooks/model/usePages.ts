import { PagesItemProps } from '../../types';

const usePages = () => {
    const items: PagesItemProps[] = [];

    return {
        Pages: items,
        loadPages: () => { console.log('loadPages') },
        createPages: () => { console.log('createPages') },
        updatePages: () => { console.log('updatePages') },
        togglePages: () => { console.log('togglePages') },
        deletePages: () => { console.log('deletePages') },
    };
};

export default usePages;
